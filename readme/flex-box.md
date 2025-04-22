# flex box

flexDirection일반적으로 , alignItems, 를 조합하여 justifyContent올바른 레이아웃을 만든다.
flex주축을 따라 사용 가능한 공간을 아이템이 어떻게 "채울지" 정의합니다. 공간은 각 요소의 flex 속성에 따라 나뉜다.

웹에서는 flex direction을 지정해주지 않는 이상 기본적으로 가로로 지정되지만
리액트 네이티브에서는 세로가 기본으로 지정된다.

```tsx
import React from "react";
import { StyleSheet, View } from "react-native";

const Flex = () => {
  return (
    <View
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: "column",
        },
      ]}
    >
      <View style={{ flex: 1, backgroundColor: "red" }} />
      <View style={{ flex: 2, backgroundColor: "darkorange" }} />
      <View style={{ flex: 3, backgroundColor: "green" }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default Flex;
```

만약에 가로로 배치하고싶다면 style에 flexDirection:"row" 를 지정한다.

---

- flexDirection노드의 자식 노드가 배치되는 방향을 제어. 이는 주축이라고도 합니다. 교차축은 주축에 수직인 축, 즉 줄 바꿈 선이 배치되는 축.

- column( 기본값 ) 자식 요소를 위에서 아래로 정렬. 줄바꿈이 활성화된 경우, 다음 줄은 컨테이너 위쪽의 첫 번째 항목 오른쪽에서 시작.

- row자식 항목을 왼쪽에서 오른쪽으로 정렬. 줄바꿈이 활성화된 경우, 다음 줄은 컨테이너 왼쪽의 첫 번째 항목 아래에서 시작.

- column-reverse자식 항목을 아래에서 위로 정렬. 줄바꿈이 활성화된 경우, 다음 줄은 컨테이너 하단의 첫 번째 항목 오른쪽에서 시작.

- row-reverse자식 항목을 오른쪽에서 왼쪽으로 정렬. 줄바꿈이 활성화된 경우, 다음 줄은 컨테이너 오른쪽의 첫 번째 항목 아래에서 시작.

자세한 내용은

https://reactnative.dev/docs/next/flexbox
