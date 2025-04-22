# expo router

expo는 기본적으로 파일 기반 라우팅이다.

폴더와 파일명이 경로가 된다.

- index.tsx 같은 경우에는 / 가 된다.
- explore.tsx 는 /explore 가 된다.
- ()안에 있으면 경로에 포함이 안된다.
- (tabs)안에 mypage디렉토리 안에 index.tsx를 만들면 /mypage가 된다.
- 각폴더에는 \_layout.tsx가 있다.

---

```tsx
<Pressable
  onPress={() => {
    router.push("/explore");
  }}
>
  <Text>gogo explore</Text>
</Pressable>
```

### \_layout.tsx

##### tabs 역할을 하는경우 <Tabs> 를 사용하여 Screen을 옮기고, 아닌경우에는 <Stack을> 사용한다.

```tsx
import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
        }}
      />
    </Tabs>
  );
}
```

```tsx
import { Stack } from "expo-router";
import React from "react";

export default function MyLayout() {
  return (
    <Stack
      screenOptions={{
        contentStyle: backgroundColor: "black",
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
```
