---
dg-home: "true"
dg-publish: "true"
---

Framer-motion은 프론트엔드 프레임워크 (혹은 라이브러리)인 [[React]]에서 사용되는 애니메이션 및 인터랙션 라이브러리이다.
Framer-motion은 복잡한 애니메이션을 간단한 [[API]]로 구현할 수 있게 도와주며, 특히 웹과 모바일 환경에서 자연스러운 인터랙션 및 전환을 생성하기 위해 설계되었다.

## 주요 기능 및 특징

- Simple API : 기본적인 애니메이션에서부터 복잡한 시퀀스 애니메이션까지, 간단하고 직관적인 API를 통해 쉽게 구현할 수 있다.
- [[Variants]] : 상태 기반의 애니메이션 로직을 정의하여, 컴포넌트의 다양한 상태 간의 전환을 쉽게 관리할 수 있다.
- Drag and Gesture : 사용자의 드래그나 제스처에 반응하는 애니메이션을 쉽게 구현할 수 있다.
- Layout Transition : 레이아웃 변경 시 자연스러운 전환 애니메이션을 제공한다. 예를 들면, 아이템의 위치나 크기가 변경될 때 부드러운 전환 효과를 사용할 수 있다.
- [[SSR]] Compatibility : 서버 사이드 렌더링과 호환되기 때문에 [[Next.js]]와 같은 프레임워크에서도 문제 없이 사용할 수 있다.
- Performance : 효율적이며 높은 성능의 애니메이션을 구현할 수 있다.

간단한 예제로, Framer-motion을 사용하여 요소를 페이드인하는 방법을 살펴보자.

```
import { motion } from 'framer-motion';

function FadeInComponent() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      I will fade in!
    </motion.div>
  );
}

```

위의 코드에서 `initial`, `animate`, 그리고 `transition` 속성을 사용하여 요소가 처음에는 투명한 상태에서 시작해 1초동안 천천히 페이드인 되게 만들었다.

이외에도, Framer-motion은 매우 유연하게 다양한 애니메이션 및 인터랙션을 구현할 수 있게 도와준다.
[관련 문서]

- [[Motion Elements]]
- [[Animate Prop]]
- [[Initial Prop]]
- [[Exit Prop]]
- [[AnimatePresence]]
- [[Transition Prop]]
- [[Drag]]
- [[Orchestration]]
- [[useAnimation]]
- [[Motion Values]]
- [[Custom Variants & Functions]]
