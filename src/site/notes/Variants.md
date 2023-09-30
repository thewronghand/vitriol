---
{
  "dg-home": "true",
  "dg-publish": true,
  "permalink": "/Variants/",
  "tags": ["gardenEntry"],
  "dgPassFrontmatter": true,
}
---

#framer-motion
variants는 [[Framer-motion\|Framer-motion]]에서 중요한 개념 중 하나다. variants는 애니메이션 상태를 명시적으로 정의하는 방법을 제공하며, 그 결과로 코드의 가독성을 향상시키고 복잡한 애니메이션 로직을 관리하는 데 도음이 된다.

variants를 사용하는 기본 아이디어는 애니메이션 가능한 값의 그룹(또는 "상태")을 미리 정의하고, 이러한 상태 간의 전환을 간결하게 관리하는 것이다.

### variants를 사용하지 않았을 때 :

```jsx
import { motion } from "framer-motion";

function AnimatedBox() {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: -100 }}
      animate={
        isVisible ? { opacity: 1, y: 0, transition: { duration: 0.5 } } : {}
      }
      onClick={() => setIsVisible(!isVisible)}
    >
      Click me!
    </motion.div>
  );
}
```

### variants를 적용한 예시 :

```jsx
import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function AnimatedBox() {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onClick={() => setIsVisible(!isVisible)}
    >
      Click me!
    </motion.div>
  );
}
```

`variants`를 사용한 두 번째 예제는 상태와 전환 로직을 `boxVariants`에 명시적으로 정의하여 전체적으로 가독성이 좋고 관리하기가 쉽다. 이러한 `variants`들은 (규모가 작은 애플리케이션이나, 단일 컴포넌트에만 적용되는 애니메이션일 경우) **해당 모션 컴포넌트 파일 내에 정의하거나**, (큰 프로젝트 혹은 확장성이 요구되는 상황, 여러 컴포넌트에서 동일한 애니메이션을 사용할 경우) **별도의 경로에서 관리**하여 애니메이션 로직을 한 곳에서 관리할 수 있도록 한다.

> 덜 일반적인 경우로는 [[전역 상태 관리 라이브러리\|전역 상태 관리 라이브러리]]를 이용하여 특정 컴포넌트의 애니메이션 상태를 전역 상태나 컨텍스트에 저장하여 활용하기도 한다. (예 : 라이트모드/다크모드와 같은 앱의 전체 테마에 따라 애니메이션 스타일이나 동작을 변경하고 싶을 경우)

## 기본 사용법 :

다음은 Framer-motion에서 variants를 사용하는 간단한 예제이다.

```jsx
import { motion } from "framer-motion";

const boxVariants = {
  hidden: {
    opacity: 0,
    y: -100,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

function AnimatedBox() {
  return (
    <motion.div initial="hidden" animate="visible" variants={boxVariants}>
      Hello, World!
    </motion.div>
  );
}
```

위의 예제에서,

- `boxVariants`는 두 개의 상태를 정의하고 있다. : `hidden`및 `visible`
- `initial`및 `animate` 속성은 각각 초기 상태와 애니메이션 후의 상태를 나타낸다. 이 경우 요소는 `hidden` 상태에서 시작하여 `visible` 상태로 애니메이션된다.

## 중첩된 variants

하위 컴포넌트의 애니메이션 상태를 조절하려면, 부모 컴포넌트의 상태에 따라 자식 컴포넌트의 상태를 변화시킬 수 있다.

```jsx
const parentVariants = {
  hidden: {
    opacity: 0,
    when: "afterChildren",
  },
  visible: {
    opacity: 1,
    when: "beforeChildren",
    staggerChildren: 0.5,
  },
};

const childVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedGroup() {
  return (
    <motion.div variants={parentVariants} initial="hidden" animate="visible">
      {[...Array(5)].map((_, i) => (
        <motion.div key={i} variants={childVariants} />
      ))}
    </motion.div>
  );
}
```

위의 예제에서:

- 부모 요소의 애니메이션이 자식 요소들보다 먼저 시작되도록 `when: "beforeChildren"`을 사용
- `staggerChildren: 0.5`는 자식 요소들 사이에 0.5초 간격을 두어 애니메이션 효과를 순차적으로 적용하도록 설정한다.

이렇듯, `variants`를 사용하면 애니메이션 로직을 중앙 집중화하고, 다양한 상태 및 상태 전환을 쉽게 관리할 수 있다.
