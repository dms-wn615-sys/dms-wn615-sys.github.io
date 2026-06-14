# AdMob 미디에이션 SDK 설정

서드파티 미디에이션 플랫폼 요구사항에 맞춰 Android 프로젝트에 SDK·어댑터 버전을 구성했습니다.

---

## 적용된 버전 (`android/mediation.gradle`)

| 구성요소 | 버전 | 비고 |
|----------|------|------|
| **minSdkVersion** | **24** | GMA SDK 24.x 필수 (API 23+) |
| **Google Mobile Ads SDK** | **24.2.0** | `play-services-ads` |
| Unity Ads 어댑터 | 4.12.5.0 | |
| Meta (Facebook) 어댑터 | 6.18.0.0 | |
| AppLovin 어댑터 | 13.0.1.1 | ✅ 적용됨 |
| ironSource 어댑터 | 8.7.0.0 | 별도 Maven 필요 (선택) |
| Mintegral 어댑터 | 16.9.71.0 | 별도 Maven 필요 (선택) |
| Pangle 어댑터 | 6.5.1.6.0 | 별도 Maven 필요 (선택) |

> 버전 업데이트 시 [AdMob 미디에이션 호환 매트릭스](https://developers.google.com/admob/android/mediation)를 반드시 확인하세요.

---

## 파일 위치

| 파일 | 역할 |
|------|------|
| `android/mediation.gradle` | SDK·어댑터 버전 중앙 관리 |
| `android/app/build.gradle` | 의존성 적용 |
| `android/app/src/main/AndroidManifest.xml` | AdMob App ID, 권한 |
| `android/app/proguard-rules-mediation.pro` | 릴리스 난독화 규칙 |

---

## AdMob App ID 설정

`AndroidManifest.xml`의 테스트 App ID를 **본인 App ID**로 교체하세요:

```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-3789928866249665~4766872402"/>
```

- [AdMob 콘솔](https://apps.admob.com) → 앱 → **앱 설정** → App ID 복사
- Publisher ID: `pub-3789928866249665` (ads.txt와 동일 계정)
- 테스트 ID(`ca-app-pub-3940256099942544~...`)는 개발용만 사용

---

## ads.txt 설정

프로젝트에 `ads.txt`가 포함되어 있습니다:

```
google.com, pub-3789928866249665, DIRECT, f08c47fec0942fa0
```

### 웹에 올리기 (필수)

AdMob/Play Console에 등록한 **개발자 웹사이트** 루트에 `ads.txt`를 호스팅해야 합니다.

1. GitHub Pages 등에 `privacy-policy.html`과 함께 업로드
2. 아래 URL로 접속되는지 확인:
   ```
   https://[도메인]/ads.txt
   ```
3. Play Console → **스토어 설정 → 개발자 페이지** → 웹사이트 URL이 위 도메인과 일치하는지 확인

> 개인정보 처리방침과 **같은 도메인**에 두면 됩니다.  
> 예: `https://사용자명.github.io/block-game/ads.txt`

AdMob 콘솔 → **앱 → ads.txt**에서 검증 상태를 확인하세요 (반영까지 최대 24시간).

---

## Play Console 데이터 보안

미디에이션 사용 시 Play Console **데이터 보안** 설문에서:

- 광고 ID 수집 **예**
- 제3자(AdMob, Meta, Unity 등) 데이터 공유 **예**
- `privacy-policy.html`에 광고·분석 관련 내용 추가 필요

---

## 추가 네트워크 (선택)

ironSource, Mintegral, Pangle 을 사용하려면 `android/build.gradle`에 Maven 저장소를 추가한 뒤 `app/build.gradle`에 어댑터 의존성을 추가하세요.

```gradle
// build.gradle repositories
maven { url 'https://android-sdk.is.com/' }
maven { url 'https://dl-maven-android.mintegral.com/repository/mbridge_android_sdk_oversea' }
maven { url 'https://artifact.bytedance.com/repository/pangle' }

// app/build.gradle dependencies
implementation "com.google.ads.mediation:ironsource:$rootProject.ext.mediationIronSourceAdapter"
implementation "com.google.ads.mediation:mintegral:$rootProject.ext.mediationMintegralAdapter"
implementation "com.google.ads.mediation:pangle:$rootProject.ext.mediationPangleAdapter"
```

버전은 `android/mediation.gradle`에서 관리합니다.

---

사용하지 않는 네트워크는 `android/app/build.gradle`에서 해당 `implementation` 줄을 삭제하면 APK 크기가 줄어듭니다.

---

## 버전 업데이트 방법

1. [호환 매트릭스](https://developers.google.com/admob/android/mediation) 확인
2. `android/mediation.gradle` 버전 수정
3. `npx cap sync android` 실행
4. `./gradlew assembleRelease`로 빌드 테스트

---

## iOS (참고)

iOS 미디에이션은 `ios/App/Podfile`에 별도 pod 버전 설정이 필요합니다. Mac + Xcode 환경에서 CocoaPods로 추가하세요.
