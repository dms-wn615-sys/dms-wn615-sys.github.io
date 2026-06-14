const I18n = (function () {
  'use strict';

  const LANGUAGES = [
    { code: 'ko', label: '한국어', flag: '🇰🇷' },
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'ja', label: '日本語', flag: '🇯🇵' },
  ];

  const STRINGS = {
    ko: {
      'app.title': '타일 매치',
      'app.tagline': '20,000레벨 · 클럽 · 토너먼트',
      'nav.home': '홈',
      'nav.levels': '레벨',
      'nav.club': '클럽',
      'nav.tournament': '대회',
      'nav.settings': '설정',
      'home.guestTitle': '게스트로 플레이 중',
      'home.guestSub': '로그인하면 진행 데이터가 계정에 저장됩니다',
      'home.login': '로그인',
      'home.statLevel': '현재 레벨',
      'home.statStars': '별',
      'home.statCoins': '코인',
      'home.chapterLabel': '현재 여행지',
      'home.continue': '계속하기',
      'home.shopTitle': '🛒 부스터 상점',
      'home.shortcutClub': '클럽 채팅',
      'home.shortcutTournament': '토너먼트',
      'levels.title': '레벨 선택',
      'levels.placeholder': '레벨 번호',
      'levels.go': '이동',
      'levels.prevPage': '이전 20',
      'levels.nextPage': '다음 20',
      'levels.chapter': '{chapter}장 · {location}',
      'levels.range': '레벨 {start} – {end}',
      'club.title': '클럽',
      'club.nickname': '닉네임',
      'club.changeClub': '클럽 변경',
      'club.membersOnline': '{count}명 온라인',
      'club.goal': '클럽 목표: 레벨 {current} / {max}',
      'club.help': '🆘 도움',
      'club.hintShare': '💡 힌트',
      'club.clear': '🎉 클리어',
      'club.cheer': '🏆 응원',
      'club.chatPlaceholder': '메시지 입력...',
      'club.joined': '{name} 가입!',
      'club.msgHelp': '도와주세요!',
      'club.msgHint': '힌트 공유해요!',
      'club.msgClear': '레벨 클리어! 🎉',
      'club.msgCheer': '토너먼트 화이팅!',
      'tournament.title': '토너먼트',
      'tournament.daily': '일일',
      'tournament.endsIn': '종료까지',
      'tournament.todayChallenge': '오늘의 도전 레벨',
      'tournament.myScore': '내 점수',
      'tournament.rank': '순위',
      'tournament.notJoined': '미참가',
      'tournament.rankNum': '{rank}위',
      'tournament.start': '🏆 토너먼트 시작',
      'tournament.leaderboard': '🏅 리더보드 TOP 20',
      'tournament.todayDesc': '오늘의 도전: {style} · {tiles}타일',
      'game.back': '뒤로',
      'game.level': '레벨',
      'game.tournament': '🏆 토너먼트',
      'game.score': '🏆 점수',
      'game.booster.undo': '실행 취소',
      'game.booster.shuffle': '섞기',
      'game.booster.hint': '힌트',
      'game.booster.extra': '슬롯 +1',
      'game.booster.shop': '부스터 상점',
      'game.shopLabel': '상점',
      'settings.title': '설정',
      'settings.language': '언어',
      'settings.account': '계정',
      'settings.authSetup': 'Google 로그인을 사용하려면 <code>js/config.js</code>에 클라이언트 ID를 설정하세요.',
      'settings.authDesc': 'Google 계정으로 로그인하면 진행 상황이 기기 간에 저장됩니다.',
      'settings.signOut': '로그아웃',
      'settings.sound': '사운드 & 진동',
      'settings.music': '배경음악',
      'settings.musicDesc': '게임 중 잔잔한 BGM 재생',
      'settings.sfx': '효과음',
      'settings.sfxDesc': '타일, 매치, 버튼 사운드',
      'settings.vibration': '진동',
      'settings.vibrationOn': '타일 선택, 매치, 클리어 시 진동이 울립니다.',
      'settings.vibrationOff': '이 기기/브라우저는 진동을 지원하지 않습니다.',
      'settings.info': '게임 정보',
      'settings.version': '버전',
      'settings.totalLevels': '총 레벨',
      'settings.privacy': '개인정보 처리방침 ↗',
      'shop.title': '🛒 부스터 상점',
      'shop.coins': '보유 코인',
      'shop.owned': '보유 {count} · +{amount}개',
      'booster.undo.name': '실행 취소',
      'booster.undo.desc': '마지막 선택 되돌리기',
      'booster.shuffle.name': '섞기',
      'booster.shuffle.desc': '남은 타일 섞기',
      'booster.hint.name': '힌트',
      'booster.hint.desc': '추천 타일 표시',
      'booster.extra.name': '슬롯 +1',
      'booster.extra.desc': '슬롯 1칸 추가',
      'modal.home': '홈',
      'modal.next': '다음 레벨',
      'modal.retry': '재도전',
      'modal.replay': '다시 플레이',
      'modal.leaderboard': '리더보드 보기',
      'modal.timeUp': '시간 초과!',
      'modal.timeUpMsg': '60초 안에 모든 타일을 제거하지 못했어요.',
      'modal.tournamentWin': '토너먼트 클리어!',
      'modal.tournamentLose': '토너먼트 실패',
      'modal.tournamentWinMsg': '리더보드 순위가 갱신되었습니다!',
      'modal.tournamentLoseMsg': '다시 도전해서 순위를 올려보세요!',
      'modal.levelWin': '레벨 클리어!',
      'modal.levelLose': '아쉬워요!',
      'modal.levelWinMsg': '훌륭해요! 모든 타일을 제거했습니다.',
      'modal.levelLoseMsg': '슬롯이 가득 찼어요. 다시 도전해보세요!',
      'chapter.levelTitle': '레벨 {level} · {location}',
      'chapter.progress': '{current} / {total} · 레벨 {level}',
      'toast.slotsFull': '슬롯이 가득 찼어요!',
      'toast.noCoins': '코인이 부족해요!',
      'toast.bought': '{name} +{amount} 구매!',
      'toast.undo': '실행 취소!',
      'toast.shuffle': '타일을 섞었어요!',
      'toast.hint': '이 타일을 추천해요!',
      'toast.extraSlot': '슬롯 +1!',
      'toast.levelLocked': '레벨 {level}은 아직 잠겨 있어요',
      'toast.nickname': '닉네임: {name}',
      'toast.tournamentScore': '점수 {score} · {rank}위 (최고 기록 유지)',
      'toast.tournamentReward': '+{coins} 🪙 · {rank}위',
      'install.ios': 'Safari에서 하단 공유(↑) → 「홈 화면에 추가」로 앱처럼 설치할 수 있어요',
      'install.androidManual': 'Chrome 메뉴(⋮) → 「앱 설치」 또는 「홈 화면에 추가」',
      'install.androidPrompt': '타일 매치를 설치하고 앱처럼 플레이하세요',
      'install.ok': '알겠어요',
      'install.install': '설치',
      'install.dialog': '앱 설치 안내',
      'loc.cherry': '🌸 벚꽃 정원',
      'loc.beach': '🏖️ 해변 리조트',
      'loc.snow': '🏔️ 설원 마을',
      'loc.jungle': '🌴 열대 정글',
      'loc.castle': '🏰 동화 성',
      'loc.city': '🌃 야경 도시',
      'loc.candy': '🍭 사탕 왕국',
      'loc.moon': '🌙 달빛 호수',
      'loc.lava': '🌋 용암 협곡',
      'loc.circus': '🎪 서커스 마을',
      'loc.desert': '🏜️ 사막 오아시스',
      'loc.train': '🚂 증기 기관차',
      'club.star': '⭐ 별빛 클럽',
      'club.tile': '🀄 타일 마스터',
      'club.puzzle': '🧩 퍼즐 러버',
      'club.sweet': '🍰 달콤한 조',
      'club.world': '🌍 세계 여행',
      'club.switched': '{name}(으)로 이동했습니다!',
      'club.welcome': '{name}에 가입했습니다! 환영합니다 🎉',
      'tournament.timeLeft': '{h}시간 {m}분 {s}초',
      'leaderboard.me': ' (나)',
      'prompt.nickname': '닉네임을 입력하세요',
      'auth.player': '플레이어',
      'auth.welcome': '{name}님, 환영합니다!',
      'auth.loginFail': '로그인에 실패했습니다.',
      'auth.logout': '로그아웃되었습니다.',
    },
    en: {
      'app.title': 'Tile Match',
      'app.tagline': '20,000 Levels · Clubs · Tournaments',
      'nav.home': 'Home',
      'nav.levels': 'Levels',
      'nav.club': 'Club',
      'nav.tournament': 'Tournament',
      'nav.settings': 'Settings',
      'home.guestTitle': 'Playing as Guest',
      'home.guestSub': 'Sign in to save progress to your account',
      'home.login': 'Sign In',
      'home.statLevel': 'Current Level',
      'home.statStars': 'Stars',
      'home.statCoins': 'Coins',
      'home.chapterLabel': 'Current Destination',
      'home.continue': 'Continue',
      'home.shopTitle': '🛒 Booster Shop',
      'home.shortcutClub': 'Club Chat',
      'home.shortcutTournament': 'Tournament',
      'levels.title': 'Select Level',
      'levels.placeholder': 'Level number',
      'levels.go': 'Go',
      'levels.prevPage': 'Prev 20',
      'levels.nextPage': 'Next 20',
      'levels.chapter': 'Ch.{chapter} · {location}',
      'levels.range': 'Level {start} – {end}',
      'club.title': 'Club',
      'club.nickname': 'Nickname',
      'club.changeClub': 'Switch Club',
      'club.membersOnline': '{count} online',
      'club.goal': 'Club goal: Level {current} / {max}',
      'club.help': '🆘 Help',
      'club.hintShare': '💡 Hint',
      'club.clear': '🎉 Clear',
      'club.cheer': '🏆 Cheer',
      'club.chatPlaceholder': 'Type a message...',
      'club.joined': 'Joined {name}!',
      'club.msgHelp': 'Help me!',
      'club.msgHint': 'Sharing a hint!',
      'club.msgClear': 'Level cleared! 🎉',
      'club.msgCheer': 'Good luck in the tournament!',
      'tournament.title': 'Tournament',
      'tournament.daily': 'Daily',
      'tournament.endsIn': 'Ends in',
      'tournament.todayChallenge': "Today's challenge level",
      'tournament.myScore': 'My Score',
      'tournament.rank': 'Rank',
      'tournament.notJoined': 'Not joined',
      'tournament.rankNum': 'Rank {rank}',
      'tournament.start': '🏆 Start Tournament',
      'tournament.leaderboard': '🏅 Leaderboard TOP 20',
      'tournament.todayDesc': "Today's challenge: {style} · {tiles} tiles",
      'game.back': 'Back',
      'game.level': 'Level',
      'game.tournament': '🏆 Tournament',
      'game.score': '🏆 Score',
      'game.booster.undo': 'Undo',
      'game.booster.shuffle': 'Shuffle',
      'game.booster.hint': 'Hint',
      'game.booster.extra': 'Slot +1',
      'game.booster.shop': 'Booster Shop',
      'game.shopLabel': 'Shop',
      'settings.title': 'Settings',
      'settings.language': 'Language',
      'settings.account': 'Account',
      'settings.authSetup': 'Set your client ID in <code>js/config.js</code> to use Google Sign-In.',
      'settings.authDesc': 'Sign in with Google to sync progress across devices.',
      'settings.signOut': 'Sign Out',
      'settings.sound': 'Sound & Vibration',
      'settings.music': 'Music',
      'settings.musicDesc': 'Play calm BGM during the game',
      'settings.sfx': 'Sound Effects',
      'settings.sfxDesc': 'Tile, match, and button sounds',
      'settings.vibration': 'Vibration',
      'settings.vibrationOn': 'Vibrate on tile tap, match, and clear.',
      'settings.vibrationOff': 'This device/browser does not support vibration.',
      'settings.info': 'Game Info',
      'settings.version': 'Version',
      'settings.totalLevels': 'Total Levels',
      'settings.privacy': 'Privacy Policy ↗',
      'shop.title': '🛒 Booster Shop',
      'shop.coins': 'Your coins',
      'shop.owned': 'Owned {count} · +{amount}',
      'booster.undo.name': 'Undo',
      'booster.undo.desc': 'Undo last move',
      'booster.shuffle.name': 'Shuffle',
      'booster.shuffle.desc': 'Shuffle remaining tiles',
      'booster.hint.name': 'Hint',
      'booster.hint.desc': 'Highlight a recommended tile',
      'booster.extra.name': 'Slot +1',
      'booster.extra.desc': 'Add one slot',
      'modal.home': 'Home',
      'modal.next': 'Next Level',
      'modal.retry': 'Retry',
      'modal.replay': 'Play Again',
      'modal.leaderboard': 'View Leaderboard',
      'modal.timeUp': "Time's Up!",
      'modal.timeUpMsg': "You couldn't clear all tiles within 60 seconds.",
      'modal.tournamentWin': 'Tournament Clear!',
      'modal.tournamentLose': 'Tournament Failed',
      'modal.tournamentWinMsg': 'Your leaderboard rank has been updated!',
      'modal.tournamentLoseMsg': 'Try again to climb the ranks!',
      'modal.levelWin': 'Level Clear!',
      'modal.levelLose': 'So Close!',
      'modal.levelWinMsg': 'Great job! You cleared all tiles.',
      'modal.levelLoseMsg': 'The slot bar is full. Try again!',
      'chapter.levelTitle': 'Level {level} · {location}',
      'chapter.progress': '{current} / {total} · Level {level}',
      'toast.slotsFull': 'Slot bar is full!',
      'toast.noCoins': 'Not enough coins!',
      'toast.bought': 'Bought {name} +{amount}!',
      'toast.undo': 'Undone!',
      'toast.shuffle': 'Tiles shuffled!',
      'toast.hint': 'Try this tile!',
      'toast.extraSlot': 'Slot +1!',
      'toast.levelLocked': 'Level {level} is still locked',
      'toast.nickname': 'Nickname: {name}',
      'toast.tournamentScore': 'Score {score} · Rank {rank} (best kept)',
      'toast.tournamentReward': '+{coins} 🪙 · Rank {rank}',
      'install.ios': 'In Safari: Share (↑) → Add to Home Screen to install',
      'install.androidManual': 'Chrome menu (⋮) → Install app or Add to Home Screen',
      'install.androidPrompt': 'Install Tile Match and play like an app',
      'install.ok': 'Got it',
      'install.install': 'Install',
      'install.dialog': 'Install app',
      'loc.cherry': '🌸 Cherry Garden',
      'loc.beach': '🏖️ Beach Resort',
      'loc.snow': '🏔️ Snow Village',
      'loc.jungle': '🌴 Tropical Jungle',
      'loc.castle': '🏰 Fairy Tale Castle',
      'loc.city': '🌃 City at Night',
      'loc.candy': '🍭 Candy Kingdom',
      'loc.moon': '🌙 Moonlit Lake',
      'loc.lava': '🌋 Lava Canyon',
      'loc.circus': '🎪 Circus Town',
      'loc.desert': '🏜️ Desert Oasis',
      'loc.train': '🚂 Steam Train',
      'club.star': '⭐ Starlight Club',
      'club.tile': '🀄 Tile Master',
      'club.puzzle': '🧩 Puzzle Lover',
      'club.sweet': '🍰 Sweet Squad',
      'club.world': '🌍 World Tour',
      'club.switched': 'Moved to {name}!',
      'club.welcome': 'Joined {name}! Welcome 🎉',
      'tournament.timeLeft': '{h}h {m}m {s}s',
      'leaderboard.me': ' (me)',
      'prompt.nickname': 'Enter your nickname',
      'auth.player': 'Player',
      'auth.welcome': 'Welcome, {name}!',
      'auth.loginFail': 'Sign-in failed.',
      'auth.logout': 'Signed out.',
    },
    ja: {
      'app.title': 'タイルマッチ',
      'app.tagline': '20,000レベル · クラブ · トーナメント',
      'nav.home': 'ホーム',
      'nav.levels': 'レベル',
      'nav.club': 'クラブ',
      'nav.tournament': '大会',
      'nav.settings': '設定',
      'home.guestTitle': 'ゲストプレイ中',
      'home.guestSub': 'ログインすると進行データが保存されます',
      'home.login': 'ログイン',
      'home.statLevel': '現在のレベル',
      'home.statStars': '星',
      'home.statCoins': 'コイン',
      'home.chapterLabel': '現在の旅行先',
      'home.continue': '続ける',
      'home.shopTitle': '🛒 ブースターショップ',
      'home.shortcutClub': 'クラブチャット',
      'home.shortcutTournament': 'トーナメント',
      'levels.title': 'レベル選択',
      'levels.placeholder': 'レベル番号',
      'levels.go': '移動',
      'levels.prevPage': '前の20',
      'levels.nextPage': '次の20',
      'levels.chapter': '{chapter}章 · {location}',
      'levels.range': 'レベル {start} – {end}',
      'club.title': 'クラブ',
      'club.nickname': 'ニックネーム',
      'club.changeClub': 'クラブ変更',
      'club.membersOnline': '{count}人オンライン',
      'club.goal': 'クラブ目標: レベル {current} / {max}',
      'club.help': '🆘 ヘルプ',
      'club.hintShare': '💡 ヒント',
      'club.clear': '🎉 クリア',
      'club.cheer': '🏆 応援',
      'club.chatPlaceholder': 'メッセージ入力...',
      'club.joined': '{name} に参加!',
      'club.msgHelp': '助けて！',
      'club.msgHint': 'ヒント共有！',
      'club.msgClear': 'レベルクリア！ 🎉',
      'club.msgCheer': 'トーナメント頑張って！',
      'tournament.title': 'トーナメント',
      'tournament.daily': 'デイリー',
      'tournament.endsIn': '終了まで',
      'tournament.todayChallenge': '今日のチャレンジ',
      'tournament.myScore': 'スコア',
      'tournament.rank': '順位',
      'tournament.notJoined': '未参加',
      'tournament.rankNum': '{rank}位',
      'tournament.start': '🏆 トーナメント開始',
      'tournament.leaderboard': '🏅 リーダーボード TOP 20',
      'tournament.todayDesc': '今日のチャレンジ: {style} · {tiles}タイル',
      'game.back': '戻る',
      'game.level': 'レベル',
      'game.tournament': '🏆 トーナメント',
      'game.score': '🏆 スコア',
      'game.booster.undo': '元に戻す',
      'game.booster.shuffle': 'シャッフル',
      'game.booster.hint': 'ヒント',
      'game.booster.extra': 'スロット+1',
      'game.booster.shop': 'ブースターショップ',
      'game.shopLabel': 'ショップ',
      'settings.title': '設定',
      'settings.language': '言語',
      'settings.account': 'アカウント',
      'settings.authSetup': 'Googleログインには <code>js/config.js</code> にクライアントIDを設定してください。',
      'settings.authDesc': 'Googleアカウントでログインすると進行状況が保存されます。',
      'settings.signOut': 'ログアウト',
      'settings.sound': 'サウンド & 振動',
      'settings.music': 'BGM',
      'settings.musicDesc': 'ゲーム中にBGMを再生',
      'settings.sfx': '効果音',
      'settings.sfxDesc': 'タイル、マッチ、ボタン音',
      'settings.vibration': '振動',
      'settings.vibrationOn': 'タイル選択、マッチ、クリア時に振動します。',
      'settings.vibrationOff': 'この端末/ブラウザは振動に対応していません。',
      'settings.info': 'ゲーム情報',
      'settings.version': 'バージョン',
      'settings.totalLevels': '総レベル',
      'settings.privacy': 'プライバシーポリシー ↗',
      'shop.title': '🛒 ブースターショップ',
      'shop.coins': '所持コイン',
      'shop.owned': '所持 {count} · +{amount}',
      'booster.undo.name': '元に戻す',
      'booster.undo.desc': '最後の操作を取り消し',
      'booster.shuffle.name': 'シャッフル',
      'booster.shuffle.desc': '残りタイルを混ぜる',
      'booster.hint.name': 'ヒント',
      'booster.hint.desc': 'おすすめタイルを表示',
      'booster.extra.name': 'スロット+1',
      'booster.extra.desc': 'スロットを1つ追加',
      'modal.home': 'ホーム',
      'modal.next': '次のレベル',
      'modal.retry': '再挑戦',
      'modal.replay': 'もう一度',
      'modal.leaderboard': 'ランキング',
      'modal.timeUp': '時間切れ！',
      'modal.timeUpMsg': '60秒以内にすべてのタイルを消せませんでした。',
      'modal.tournamentWin': 'トーナメントクリア！',
      'modal.tournamentLose': 'トーナメント失敗',
      'modal.tournamentWinMsg': 'ランキングが更新されました！',
      'modal.tournamentLoseMsg': 'もう一度挑戦して順位を上げましょう！',
      'modal.levelWin': 'レベルクリア！',
      'modal.levelLose': '残念！',
      'modal.levelWinMsg': '素晴らしい！すべてのタイルを消しました。',
      'modal.levelLoseMsg': 'スロットがいっぱいです。もう一度！',
      'chapter.levelTitle': 'レベル {level} · {location}',
      'chapter.progress': '{current} / {total} · レベル {level}',
      'toast.slotsFull': 'スロットがいっぱいです！',
      'toast.noCoins': 'コインが足りません！',
      'toast.bought': '{name} +{amount} 購入！',
      'toast.undo': '元に戻しました！',
      'toast.shuffle': 'タイルを混ぜました！',
      'toast.hint': 'このタイルがおすすめ！',
      'toast.extraSlot': 'スロット+1！',
      'toast.levelLocked': 'レベル {level} はまだロックされています',
      'toast.nickname': 'ニックネーム: {name}',
      'toast.tournamentScore': 'スコア {score} · {rank}位 (ベスト更新なし)',
      'toast.tournamentReward': '+{coins} 🪙 · {rank}位',
      'install.ios': 'Safari: 共有(↑) → 「ホーム画面に追加」でインストール',
      'install.androidManual': 'Chrome メニュー(⋮) → アプリをインストール',
      'install.androidPrompt': 'タイルマッチをインストールしてアプリのようにプレイ',
      'install.ok': 'OK',
      'install.install': 'インストール',
      'install.dialog': 'アプリインストール',
      'loc.cherry': '🌸 桜の庭園',
      'loc.beach': '🏖️ ビーチリゾート',
      'loc.snow': '🏔️ 雪の村',
      'loc.jungle': '🌴 熱帯ジャングル',
      'loc.castle': '🏰 おとぎの城',
      'loc.city': '🌃 夜景の街',
      'loc.candy': '🍭 キャンディ王国',
      'loc.moon': '🌙 月明かりの湖',
      'loc.lava': '🌋 溶岩峡谷',
      'loc.circus': '🎪 サーカス村',
      'loc.desert': '🏜️ 砂漠のオアシス',
      'loc.train': '🚂 蒸気機関車',
      'club.star': '⭐ 星のクラブ',
      'club.tile': '🀄 タイルマスター',
      'club.puzzle': '🧩 パズルラバー',
      'club.sweet': '🍰 スイート部隊',
      'club.world': '🌍 世界旅行',
      'club.switched': '{name} に移動しました！',
      'club.welcome': '{name} に参加しました！ 🎉',
      'tournament.timeLeft': '{h}時間 {m}分 {s}秒',
      'leaderboard.me': ' (自分)',
      'prompt.nickname': 'ニックネームを入力',
      'auth.player': 'プレイヤー',
      'auth.welcome': '{name}さん、ようこそ！',
      'auth.loginFail': 'ログインに失敗しました。',
      'auth.logout': 'ログアウトしました。',
    },
  };

  const LOC_IDS = [
    'cherry', 'beach', 'snow', 'jungle', 'castle', 'city',
    'candy', 'moon', 'lava', 'circus', 'desert', 'train',
  ];

  let lang = 'ko';
  let saveRef = null;
  let persistFn = null;
  const listeners = [];

  function t(key, params) {
    let str = STRINGS[lang]?.[key] ?? STRINGS.ko[key] ?? key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        str = str.replace(new RegExp(`\\{${k}\\}`, 'g'), v);
      });
    }
    return str;
  }

  function getLang() {
    return lang;
  }

  function detectLang(settings) {
    if (settings?.language && STRINGS[settings.language]) return settings.language;
    const nav = (navigator.language || 'ko').slice(0, 2);
    return STRINGS[nav] ? nav : 'ko';
  }

  function setLang(code) {
    if (!STRINGS[code]) return;
    lang = code;
    if (saveRef?.settings) {
      saveRef.settings.language = code;
      persistFn?.();
    }
    document.documentElement.lang = code;
    applyPage();
    renderLanguagePicker();
    listeners.forEach((fn) => fn(code));
  }

  function onChange(fn) {
    listeners.push(fn);
  }

  function applyPage() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      el.placeholder = t(el.dataset.i18nPlaceholder);
    });
    document.querySelectorAll('[data-i18n-title]').forEach((el) => {
      el.title = t(el.dataset.i18nTitle);
    });
    document.querySelectorAll('[data-i18n-aria]').forEach((el) => {
      el.setAttribute('aria-label', t(el.dataset.i18nAria));
    });
    document.title = t('app.title');
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.content = t('app.tagline');
  }

  function renderLanguagePicker() {
    const picker = document.getElementById('language-picker');
    if (!picker) return;
    picker.innerHTML = '';
    LANGUAGES.forEach(({ code, label, flag }) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `lang-chip${lang === code ? ' active' : ''}`;
      btn.textContent = `${flag} ${label}`;
      btn.addEventListener('click', () => setLang(code));
      picker.appendChild(btn);
    });
  }

  function getLocationName(chapterIndex) {
    const id = LOC_IDS[chapterIndex % LOC_IDS.length];
    return t(`loc.${id}`);
  }

  function getLocationId(chapterIndex) {
    return LOC_IDS[chapterIndex % LOC_IDS.length];
  }

  function getClubName(clubId) {
    return t(`club.${clubId}`);
  }

  function init(save, persistSave) {
    saveRef = save;
    persistFn = persistSave;
    if (!save.settings) save.settings = {};
    lang = detectLang(save.settings);
    save.settings.language = lang;
    document.documentElement.lang = lang;
    applyPage();
    renderLanguagePicker();
  }

  return {
    t,
    init,
    setLang,
    getLang,
    onChange,
    applyPage,
    renderLanguagePicker,
    getLocationName,
    getLocationId,
    getClubName,
    LANGUAGES,
  };
})();
