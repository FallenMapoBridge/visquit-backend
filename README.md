# VISQUIT Backend

## Database

![Databse](/src/database.PNG)

### Table description
#### USER_TB(로그인한 점주에 대한 정보 테이블)
* user_id(PK): user(점주) id
* user_name: user의 이름

#### STORE_TB(가게에 대한 정보 테이블)
* store_id(PK): store의 id
* user_id(FK): reference USER_TB table -> 하나의 user는 여러 store를 소유 가능
* store_location: 가게의 위치 정보
* Store_tel: 가게의 전화번호
 
#### MENU_TB (가게의 메뉴에 대한 정보 테이블)
* menu_id(PK): menu의 id
* store_id(FK): reference STORE_TB table -> 하나의 store는 여러 개의 menu 소유 가능
* menu_name: 메뉴 이름
* Menu_price: 해당 메뉴 하나 당 가격

#### ORDERITEM_TB (단일 메뉴 주문에 대한 정보 테이블)
* item_id(PK): 하나의 item에 대한 id
* order_id(FK): reference ORDERS_TB table -> 하나의 order에는 여러 개의 item이 존재 가능
* menu_id(FK): reference MENU_TB table -> 하나의 menu는 여러 번 주문 될 수 있음
* Item_quantity: 해당 menu를 주문하려는 수량
* Item_price: menu_price * item_quantity

#### ORDERS_TB (한 번의 주문에 대한 정보 테이블) -> 여러 item이 모여서 하나의 order 구성
* order_id(PK): 주문에 대한 id 
* store_id(FK): reference STORE_TB table
* order_date: 주문 날짜
* order_num: 주문 번호(당일 몇 번째 주문)
* order_time: 주문 시간(timestamp)
* order_price: 주문의 총액(sum of item_price)
* serve_fl: 주문한 메뉴가 고객에게 제공되었는지 여부


# NUGU Architecture Design

## Visquit-backend branch 전략

### master 
: develop branch에서 구현이 완료되어 release한것들을 merge함. release 단계에 맞게 Tag가 부착됨. 이 단계에서 개별 commit들은 user가 사용가능한 것들임.
(*별도의 release branch는 존재하지 않음)

### develop 
: 개발이 진행되는 main branch, feat branch를 머지함. 단계별로 정한 기능의 집합의 구현이 완료되면 master branch로 merge됨.

### feat/[feature_name] 
: develop branch에서 파생되어 세부적인 기능구현을 위해 생성된 branch, 구현이 끝나고는 develop에 merge 됨.

### hotfix/[issue #] 
: master branch에서 파성되며 release된 이후에 특정한 issue를  수정하기 위해서 생성됨. Fix 이후에는 master branch에 merge됨.

### database 
: ddl,DB scheme description, table attribute description except DB configuration , develop branch에 머지됨.



## General Setting
### 외부 연동 서버
#### Web URL : TBA
#### Exception message : "Err Code 404 서버에 연결하지 못했습니다"


## Intent

### A. Welcome.with.NUGU.INTENT.open
- Precondition : Play 세션 진입이 Invocation Name + NUGU.INTENT.open인 경우
(Invocation name과 함께 "시작/오픈" 이라고 발화한 경우)

- Does this INTENT need backend proxy? YES

- Output : 안녕하세요 비스킷입니다. 무엇을 주문하시겠어요? 메뉴 하나씩 주문해주세요.<br><br>


### B. Order
<ol>

#### <li> 주문요청

- Command : (menu), (count), (ending of word)
  <br> ex) 불고기와퍼 한 개 줘 <br>
  
발화 예시|불고기 와퍼|한 개|줘|
|------|----|-----|-|
|Category|menu|count|ending of word|
|Entity|MENU|COUNT|STATEMENT|
<br>

### <li>request sample<br>

~~~json
{
    "version": "2.0",
    "action": {
        "actionName": "order",
        "parameters": {
            "menu": { "type": "menu", "value": "불고기와퍼"},
            "count": { "type": "count", "value": "두개"}
        }
    },
    "context": {
        "session": {
            "isPlayBuilderRequest": True,
            "id": "a8b2d0e7-3d13-4e51-866f-bb4c03801594",
            "isNew": True
        },
        "device": {
            "type": "speaker",
            "state": {}
        },
        "supportedInterfaces": {}  }
    }
}
~~~
<br>

### <li> Does this INTENT need backend proxy? YES

### <li> Order Intent에 대한 Action : order_confirm
Prompt<br>(NUGU 응답)|불고기 와퍼|한 개|주문되었습니다|더 주문할 것 있으신가요?|
|------|----|-----|-|-------|
|Category|menu|count|mention|mention|
|Utterance parameter|{{menu}}|{{count}}|fixed statement|fixed statement|

<br>

- End_Order라는 Intent가 실행될 때까지 Order Intent 반복.

</ol>


### C. Ask something

<ol>

#### <li> ask.taste

- ask some menu is salty or not.
- Command : (menu), (ending of word)<br>
  ex) 불고기와퍼 싱거워? <br>
  
발화 예시|불고기 와퍼|싱거워?|
|------|----|------|
|Category|menu|ending of word|
|Entity|MENU|TASTE|
<br>

- Does this INTENT need backend proxy? NO

- ask.taste에 대한 Action : answer_taste
- Prompt<br>

(NUGU 응답)|불고기 와퍼|는|짠편입니다|
|---------|--------|-|-------|
|Category|menu|postposition|taste|
|Utterance parameter|{{menu}}|fixed postposition|{{taste}}|

#### <li> ask.spicy

- ask some menu is spicy of not.
- Command : (menu), (ending of word)<br>
  ex) 불고기와퍼 매워? <br>
  
발화 예시|불고기 와퍼|매워?|
|------|----|------|
|Category|menu|ending of word|
|Entity|MENU|SPICY|
<br>
-  Does this INTENT need backend proxy? NO

- ask.spicy에 대한 Action : answer_spicy
- Prompt<br>

(NUGU 응답)|불고기 와퍼|는|맵지않습니다|
|---------|--------|-|-------|
|Category|menu|postposition|spicy|
|Utterance parameter|{{menu}}|fixed postposition|{{spicy}}|

#### <li> ask.recommend

- ask to recommend delicious menu.

</ol>

### D. End_Order

<ol>
  <li> Say you don't have anything to order
<li> Command : (menu), (ending of word)<br>
  ex) 불고기와퍼 매워? <br>
  <br>

발화 예시|더 주문할거 없어|
|------|------|
|Category|tell no more order|
|Entity|END|

### <li>request sample<br>

~~~json
{
    "version": "2.0",
    "action": {
        "actionName": "END_order",
        "parameters": {
            "end": { "type": "end", "value": "END"}
        }
    },
    "context": {
        "session": {
            "isPlayBuilderRequest": True,
            "id": "a8b2d0e7-3d13-4e51-866f-bb4c03801594",
            "isNew": True
        },
        "device": {
            "type": "speaker",
            "state": {}
        },
        "supportedInterfaces": {}  }
    }
}
~~~
### <li> Does this INTENT need backend proxy? YES

### <li> End_Order에 대한 Action : End_Order
Prompt<br>(NUGU 응답)|주문이 완료되었습니다|
|------|----|
|Category|statement|
|Utterance parameter|fixed statement|

<br>

</ol>

### E. Check ordered Menu

## Entitiy

### A. Menu
- 주문할 메뉴를 나타냄

|Parameter|synonym|
|---------|-------|
|불고기와퍼|불고기와퍼, 와퍼불고기, 불고기 들어간 와퍼|
|치즈와퍼|치즈와퍼, 와퍼치즈, 치즈 들어간 와퍼, 치즈맛 와퍼|
|치즈스틱|치즈스틱, 스틱치즈|
|콜라|콜라, coke|
|아이스아메리카노|아이스아메리카노, 아메리카노 아이스, 시원한 아메리카노|
|따뜻한아메리카노|따뜻한아메리카노, 아메리카노 따뜻한거, 아메리카노 핫|

- 메뉴는 추후 추가 에정

### B. COUNT 
- 메뉴의 수량을 나타냄.

|Parameter|Synonym|
|---------|-------|
|1|한개, 하나|
|2|두개|
|3|세개|
|...|...|

### C. END
- 주문의 종료를 나타냄.
- 
|Parameter|Synonym|
|---------|-------|
|END|END, 더 없어, 주문끝, 없어, 없습니다, ...|

### D. Statement
- 종결어미
  
|Parameter|Synonym|
|---------|-------|
|주세요|줘, 요, 주세요, 줘요|

## Actions

### A. NUGU.ACTION.Welcome

<ul>
<li>  Play에 최초로 진입했을 때 동작하는 action
<li> 기기 대기(IDLE) 상태에서 '아리아 XXX 시작'과 같이 Play 호출이름(Invocation name)과 NUGU.INTENT.open을 함께 발화하거나,<br>
- 이 경우에는 'Invocation name만 발화한 경우'에 해당하는 Prompt가 발화되며, Prompt가 발화된 이후 세션 대기 상태로 넘어가며, 이러한 Prompt를 '대기 Prompt'라고 합니다.
<li> 기기 대기(IDLE) 상태에서 '아리아 XXX에서 ~~ 해줘' 와 같이 Play 호출이름과 해당 Play 내의 Custom Intent를 함께 발화하여 Play로 진입하게 되었을 때 동작하는 Action입니다.<br>
- 이 경우에는 'Invocation name과 Intent를 함께 발화한 경우'에 해당하는 Prompt가 응답의 앞에 붙어서 발화됩니다. 이러한 Prompt를 '연속 Prompt'라고 합니다.
</ul>



### B. NUGU.ACTION.exit
  <ul>
  <li> 사용자가 Play의 세션 안에서 '주문 끝', '더 주문할거 없어' 등 NUGU.INTENT.stop에 해당하는 발화를 한 경우에 동작합니다. Prompt가 발화된 이후, 세션이 종료되고 IDLE 상태로 돌아갑니다. 이러한 Prompt를 '종료 Prompt'라고 합니다.
  </ul>

### C. NUGU.ACTION.rewind
<ul>
<li>사용자가 '다시', '다시 틀어줘', '재시작' 등과 같이 NUGU.INTENT.rewind에 해당하는 발화를 한 경우에 동작하는 Action입니다.
<li>이 Action은 Response는 갖지 않으며, 최근 응답을 처음부터 재생하는 명령을 수행합니다.
</ul>

  
### D. NUGU.ACTION.fallback
<ul>
<li> 이 Play가 처리할 수 없는 발화가 들어온 경우에 동작하는 action
<li>사용자가 Play 세션 내에서 발화를 했지만 처리할 Intent가 없는 경우에 동작합니다.
<li> 사용자가 '다시', '다시 들려줘' 와 같이 말한 경우 동작하는 action
<li> 처리할 Intent가 없는 상황 즉, Fallback 상황은 종료 유형과 대기 유형을 혼합하여 Prompt를 구성하는 복합 유형입니다.
</ul>



### E. Order_confirm
<ul>
<li>주문한 내용을 고객에게 확인시켜주고 서버로 주문내용을 전달
<li>
</ul>

### F. End_order
<ul>
<li> 주문을 종료하는 함수.
<li> 이 함수가 실행되면 서버로 주문이 종료되었음을 전달.
</ul>

### G. Check_order
<ul>
<li> 손님이 주문한 내용을 확인하고 싶을 때 요청
<li> 데이터베이스에서 주문 내용을 호출하여 서버를 통해 NUGU 스피커로 전달하여 손님에게 말함.
</ul>

## 왜 GET 방식이 아닌 POST 방식을 사용해야 하는가?

GET POST 요청 둘 다 백엔드 서버로 들어옴 <br>
누구에서 GET POST 요청 둘 다 보내는데 post로 해야하는 이유는 <br>
NUGU에서 url은 하나이기 때문에 GET으로 하면 /order_burger/<str:버거이름> 이 url로 GET을 보내야 하는데 <br>
누구에서 동적 url을 못 날려줘서 post로 방법을 바꿔야함. <br>