import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useNavigate } from 'react-router-dom';
import './Graph.css';
import { linkDistance } from '../utils/graphUtils';
import { COLOR } from '../utils/styles';

function Graph({ data, currentId }) {
  console.log('rerendered');
  const svgRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const svgWidth = svgRef.current.clientWidth;
    const svgHeight = svgRef.current.clientHeight;

    const simulation = d3
      .forceSimulation(data.nodes)
      .force(
        'link',
        d3
          .forceLink(data.links)
          .id((d) => d.id)
          .distance((link) => linkDistance(link, data))
      )
      .force('charge', d3.forceManyBody().strength(-200))
      .force('x', d3.forceX(svgWidth / 2).strength(0.1))
      .force('y', d3.forceY(svgHeight / 2).strength(0.1))
      .force(
        'collide',
        d3.forceCollide().radius((d) => {
          const linkedNodesCount = data.links.filter(
            (l) => l.source.id === d.id || l.target.id === d.id
          ).length;
          return 5 * (1 + linkedNodesCount * 0.1) + 5;
        })
      );

    const g = svg.append('g');

    const link = g
      .append('g')
      .attr('class', 'links')
      .selectAll('line')
      .data(data.links)
      .join('line');

    const node = g
      .append('g')
      .attr('class', 'nodes')
      .selectAll('circle')
      .data(data.nodes)
      .join('circle')
      .attr('r', (d) => {
        const linkedNodesCount = data.links.filter(
          (l) => l.source.id === d.id || l.target.id === d.id
        ).length;
        return 5 * (1 + linkedNodesCount * 0.1);
      })
      .attr('fill', (d) => {
        if (d.id === currentId) {
          return d.exists === false
            ? COLOR.GRAPH.NEGATIVE_SECONDARY
            : COLOR.GRAPH.SECONDARY;
        }
        return d.exists === false ? COLOR.GRAPH.NEGATIVE : COLOR.GRAPH.PRIMARY;
      })
      .attr('cursor', (d) => (d.exists === false ? 'default' : 'pointer'))
      .call(drag(simulation))
      .on('click', (event, d) => {
        if (d.exists !== false) {
          navigate(`/post/${d.id}`);
        }
      });

    node.append('title').text((d) => d.id);

    const text = g
      .append('g')
      .attr('class', 'labels')
      .selectAll('text')
      .data(data.nodes)
      .join('text')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .text((d) => d.label)
      .attr('fill', (d) => {
        if (d.exists === false) {
          return COLOR.TEXT.TERTIARY;
        }
        return COLOR.TEXT.PRIMARY;
      })
      .attr('pointer-events', 'none');
    // Quadtree 설정하기
    const quadtree = d3
      .quadtree()
      .extent([
        [-1, -1],
        [svgWidth + 1, svgHeight + 1],
      ])
      .addAll(data.nodes.map((d) => [d.x, d.y]));

    simulation.on('tick', () => {
      link
        .attr('x1', (d) => d.source.x)
        .attr('y1', (d) => d.source.y)
        .attr('x2', (d) => d.target.x)
        .attr('y2', (d) => d.target.y);

      node.attr('cx', (d) => d.x).attr('cy', (d) => d.y);

      text
        .attr('x', (d) => {
          let tx = d.x;
          let ty = d.y - 15;

          const closest = quadtree.find(tx, ty);

          if (
            closest &&
            d !== closest &&
            Math.abs(closest[0] - tx) < 15 &&
            Math.abs(closest[1] - ty) < 15
          ) {
            tx += (tx - closest[0]) * 0.05;
            ty += (ty - closest[1]) * 0.05;
          }

          return tx;
        })
        .attr('y', (d) => {
          const linkedNodesCount = data.links.filter(
            (l) => l.source.id === d.id || l.target.id === d.id
          ).length;
          const radius = 5 * (1 + linkedNodesCount * 0.1);
          return d.y - radius - 7;
        });
    });

    const zoomHandler = d3
      .zoom()
      .scaleExtent([1, 5])
      .on('zoom', (event) => {
        let transform = event.transform;

        const width = svgWidth / transform.k;
        const height = svgHeight / transform.k;

        // 제한된 x와 y 값을 계산
        const maxX = svgWidth - width;
        const maxY = svgHeight - height;

        // 이동할 수 있는 최대/최소 x와 y 값으로 transform.x와 transform.y 값을 제한
        transform.x = Math.min(0, Math.max(-maxX, transform.x));
        transform.y = Math.min(0, Math.max(-maxY, transform.y));

        g.attr('transform', transform);
      });
    svg.call(zoomHandler);

    function drag(simulation) {
      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.1).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = Math.min(svgWidth - 5, Math.max(5, event.x));
        d.fy = Math.min(svgHeight - 5, Math.max(5, event.y));
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0.05);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    }
  }, [data, navigate, currentId]);

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <svg ref={svgRef} width="100%" height="100%" overflow="hidden"></svg>
    </div>
  );
}

export default Graph;
