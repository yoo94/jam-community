## react native core components and api

## 1. 코어 컴포넌트 (Cross-Platform)

애플리케이션의 기본 UI를 구성하는 핵심 구성요소들로, 안드로이드와 아이오에스 모두에서 동일하게 동작합니다.

### A. 기본 컴포넌트 (Basic Components)

- **View**
  - UI의 기본 컨테이너이자 레이아웃의 빌딩 블록

---

- **Text**
  - 텍스트를 표시하며, 스타일링이나 터치 이벤트까지 처리
  - View에다가 바로 이 컴포넌트를 사용하면 ios같은 경우에는 위아래 노치영역부터 텍스트가 생기기 때문에 고려해서 해야한다.
  - 그렇기 때문에 **SafeAreaView** 라는 태그를 사용함

```bash
<Text style={styles.titleText} onPress={onPressTitle}>
   {titleText}
   {'\n'}
   {'\n'}
</Text>
```

---

- **Image**
  - 다양한 포맷의 이미지를 표현

```bash
<Image
  style={styles.tinyLogo}
  source={require('@expo/snack-static/react-native-logo.png')}
/>
<Image
  style={styles.tinyLogo}
  source={{
    uri: 'https://reactnative.dev/img/tiny_logo.png',
  }}
/>
```

---

- **TextInput**
  - 사용자로부터 텍스트 입력을 받기 위한 컴포넌트

```bash
<TextInput
 style={styles.input}
 onChangeText={onChangeNumber}
 value={number}
 placeholder="useless placeholder"
 keyboardType="numeric"
/>
```

---

- **ScrollView**
  - 여러 하위 컴포넌트를 감싸면서 스크롤이 가능한 컨테이너

```bash
   <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  </SafeAreaProvider>
```

---

- **StyleSheet**
  - CSS와 유사한 방식으로 스타일을 정의할 수 있는 도구

```bash
<SafeAreaView>
   <View style={styles.container}>
   </View>
</SafeAreaView>

const style = StyleSheet.create({
   container : {
      backgroundColor: "yellow"
   }
})
```

---

### B. 사용자 인터페이스 (User Interface)

- **Pressable**  
  터치 이벤트를 감지하는 기본 컴포넌트

```bash
<Pressable
 onPress={() => {
   setTimesPressed(current => current + 1);
 }}
 style={({pressed}) => [
   {
     backgroundColor: pressed ? 'rgb(210, 230, 255)' : 'white',
   },
   styles.wrapperCustom,
 ]}>
 {({pressed}) => (
   <Text style={styles.text}>{pressed ? 'Pressed!' : 'Press Me'}</Text>
 )}
</Pressable>
```

---

- **TouchableOpacity**  
  뷰가 터치에 제대로 반응하도록 하는 래퍼입니다. 눌렀을 때 래핑된 뷰의 불투명도가 감소하여 어두워짐

```bash
<TouchableOpacity style={styles.button} onPress={onPress}>
 <Text>Press Here</Text>
</TouchableOpacity>
```

---

- **TouchableWithoutFeedback**  
  뷰가 터치에 제대로 반응하도록 하는 래퍼입니다. 눌렀을 아무 피드백없이 onPress만 실행한다.

```bash
<TouchableWithoutFeedback onPress={onPress}>
 <View style={styles.button}>
   <Text>Touch Here</Text>
 </View>
</TouchableWithoutFeedback>
```

---

- **Button**  
  터치 이벤트를 감지하는 기본 버튼 컴포넌트

```bash
<Button
   onPress={onPressLearnMore}
   title="Learn More"
   color="#841584"
   accessibilityLabel="Learn more about this purple button"
/>
```

- **Switch**  
  Boolean 타입의 값을 토글할 수 있는 스위치

```bash
<SafeAreaProvider>
   <SafeAreaView style={styles.container}>
     <Switch
       trackColor={{false: '#767577', true: '#81b0ff'}}
       thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
       ios_backgroundColor="#3e3e3e"
       onValueChange={toggleSwitch}
       value={isEnabled}
     />
   </SafeAreaView>
 </SafeAreaProvider>
```

---

### C. 리스트 뷰 (List Views)

- **FlatList**  
  최적화된 스크롤 가능한 리스트로, 큰 데이터 집합에 적합

```bash
const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Third Item',
  },
];

type ItemProps = {title: string};

const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({item}) => <Item title={item.title} />}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

```

- **SectionList**  
  구간별(section) 리스트 렌더링에 특화된 컴포넌트

```bash
const DATA = [
  {
    title: 'Main dishes',
    data: ['Pizza', 'Burger', 'Risotto'],
  },
  {
    title: 'Sides',
    data: ['French Fries', 'Onion Rings', 'Fried Shrimps'],
  },
  {
    title: 'Drinks',
    data: ['Water', 'Coke', 'Beer'],
  },
  {
    title: 'Desserts',
    data: ['Cheese Cake', 'Ice Cream'],
  },
];

const App = () => (
  <SafeAreaProvider>
    <SafeAreaView style={styles.container} edges={['top']}>
      <SectionList
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) => (
          <View style={styles.item}>
            <Text style={styles.title}>{item}</Text>
          </View>
        )}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </SafeAreaView>
  </SafeAreaProvider>
);

```

## 2. 플랫폼별 컴포넌트 및 API

필요에 따라 해당 플랫폼 전용 기능을 제공하는 컴포넌트를 사용할 수 있습니다.

### A. 안드로이드 전용 (Android-Specific Components and APIs)

- **BackHandler**  
  안드로이드의 하드웨어 백 버튼 이벤트 처리를 위한 API
- **DrawerLayoutAndroid**  
  안드로이드 네이티브의 내비게이션 드로어(Drawer)를 구현
- **PermissionsAndroid**  
  안드로이드 런타임 권한 요청 및 관리
- **ToastAndroid**  
  안드로이드 특유의 Toast(짧은 메시지 팝업) 알림 생성

### B. 아이오에스 전용 (iOS-Specific Components and APIs)

- **ActionSheetIOS**  
  아이오에스 스타일의 액션 시트(옵션 목록 또는 공유 시트)를 표시  
  _(추가로 아이오에스의 UIKit 기반의 다양한 네이티브 컴포넌트를 필요에 따라 네이티브 모듈로 래핑해 사용할 수 있습니다.)_

## 3. 기타 유용한 컴포넌트 및 API (Others)

크로스 플랫폼 및 플랫폼별 컴포넌트 외에도, 앱 개발에 도움이 되는 다양한 유틸리티 컴포넌트와 API가 제공됩니다.

- **ActivityIndicator**  
  로딩 상태를 나타내는 원형 스피너
- **Alert**  
  모달 형태의 알림 대화상자 표시
- **Animated**  
  자연스러운 애니메이션 효과 구현을 위한 라이브러리
- **Dimensions**  
  기기의 화면 크기 및 방향 정보를 제공
- **KeyboardAvoidingView**  
  키보드가 나타날 때 자동으로 레이아웃을 조정하여 입력창 가리기를 방지
- **Linking**  
  앱 내외의 URL 연동 및 딥 링크 지원
- **Modal**  
  기존 뷰 위에 내용을 오버레이 형태로 표시하는 모달 창
- **PixelRatio**  
  디바이스의 픽셀 밀도 정보를 제공하여, 해상도 관련 처리를 지원
- **RefreshControl**  
  ScrollView 내부에서 당겨서 새로고침 기능을 구현
- **StatusBar**  
  디바이스의 상태 표시줄(시계, 배터리 아이콘 등) 스타일과 동작 제어
