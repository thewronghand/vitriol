---
{"dg-home":"true","dg-publish":true,"permalink":"/Motion Elements/","tags":["gardenEntry"],"dgPassFrontmatter":true}
---


Motion Elements는 [[Framer-motion\|Framer-motion]]의 핵심적인 개념 중 하나이다.
Motion Elements는 Framer-motion에서 제공하는 **애니메이션 가능한 기본 HTML 요소들**이다. 이들요소는 <motion.div>와 같이 motion 접두사와 함께 나타난다.

## 특징:
1. 직관성 : Motion Elements는 기존의 HTML 요소와 동일한 방식으로 사용되지만, 동시에 애니메이션 관련 속성과 기능을 제공한다. 따라서 개발자는 별도의 컴포넌트나 Wrapper를 작성할 필요 없이 곧바로 애니메이션을 적용할 수 있다.
2. 통합성 : Motion Elements는 React의 props 시스템을 활용하여 애니메이션 속성을 쉽게 전달할 수 있다. 이를 통해 개발자는 애니메이션 상태, 전환, 이벤트 핸들러 등을 손쉽게 관리할 수 있다.
3. 확장성 : Motion Elements는 사용자 정의 애니메이션 및 변환 기능을 제공한다. 이를 통해 개발자는 복잡한 애니메이션 시나리오를 구현하는 데 필요한 모든 도구를 얻을 수 있다.

## 사용 예제 :
기본적인 `motion.div`의 사용 예제이다.
```
import { motion } from 'framer-motion';

function AnimatedBox() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      This is an animated div.
    </motion.div>
  );
}

```
위의 예제에서 `motion.div`는 처음에([[Initial Prop\|Initial Prop]]) 투명한 상태에서 시작하여 1초동안 점점 불투명해지는 애니메이션을 수행한다.

Motion Elements는 Framer-motion의 기초적이면서도 강력한 도구이다. 이를 통해 개발자는 복잡한 애니메이션 로직 없이도 웹 페이지에 동적인 요소를 쉽게 추가할 수 있다.
