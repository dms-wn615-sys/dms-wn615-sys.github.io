# 개발자 웹사이트 배포 (GitHub Pages)

Play Console · AdMob에 필요한 개발자 페이지를 올리는 방법입니다.

## 포함 파일

| 파일 | 용도 |
|------|------|
| `developer.html` | **Play Console 개발자 웹사이트 URL** |
| `privacy-policy.html` | 개인정보 처리방침 URL |
| `ads.txt` | AdMob ads.txt 검증 |
| `store-assets/play-store-icon.png` | 아이콘 |

## GitHub Pages 배포

1. GitHub에 새 저장소 생성 (예: `ori-block-game`)
2. 아래 파일 업로드:
   - `developer.html`, `privacy-policy.html`, `developer.css`, `ads.txt`
   - `index.html`, `game.js`, `style.css`, `audio.js` (웹 플레이용, 선택)
   - `store-assets/` 폴더
3. **Settings → Pages → Source: Deploy from branch → main / root**
4. 몇 분 후 URL 확인

## Play Console에 입력할 URL

저장소 이름이 `ori-block-game`, 사용자명이 `myuser`일 때:

| 항목 | URL |
|------|-----|
| **개인정보 처리방침** | `https://myuser.github.io/ori-block-game/privacy-policy.html` |
| **ads.txt** | `https://myuser.github.io/ori-block-game/ads.txt` |

> 세 URL 모두 **같은 도메인**이어야 AdMob ads.txt 검증이 통과합니다.

## 로컬 확인

```powershell
cd "c:\Users\배서현\Desktop\my-first-project"
npx --yes serve -l 8080
```

브라우저에서:
- http://localhost:8080/developer.html
- http://localhost:8080/privacy-policy.html
- http://localhost:8080/ads.txt
