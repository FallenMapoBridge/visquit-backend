# Play 정보 등록 시 주의 사항

## Health check
서비스 정상 여부를 확인하기 위해 다음의 /health url을 다음과 같이 구현해야 함. <br>
NUGU developers에서는 이 URL을 주기적으로 요청해서 서버의 정상 여부를 판단함. <br>
정상적으로 서비스가 가능하면 HTTP Status code를 "200 OK"로 리턴. (결과 텍스트는 OK 등 아무 문자나 리턴해도 됨.)<br>
<br>
만약 서비스에 문제가 있을 경우에는 "500 Internal Server Error" 등 200 이외의 HTTP Status Code를 리턴하면 됨.<br>

~~~
GET /health HTTP/1.1
Accept: */*


HTTP/1.1 200 OK
Content-Length: 2
OK
~~~

<br>

>> 심사 요청 시 /health url이 정상 동작해야 하며, /health url에서 200 이외의 상태가 오래 지속되면 서비스가 직권 중지될 수 있으므로 유의해야 함.


# Backend Proxy 구축.

Play에서는 사용자의 발화를 분석한 내용을 기반으로 적절한 응답을 내보내 주거나 동작을 수행함. <br>
이 응답에 필요한 정보가 외부 서버로부터 가져와야 하는 경우는 REST API를 통해 요청, <br>
음악을 재생하는 등의 디바이스를 동작시키는 명령을 정의하는 것도 Backend proxy에서 처리. <br> <br>
NUGU 플랫폼의 Dialog Manager는 지정된 포맷(Backend proxy API 규격)으로 요청을 하기 때문에 외부 서비스의 REST API 포맷이 Backend proxy API 규격과 다르다면 포맷을 변환해주기 위한 Backend proxy 서버를 개발해야 함.

![REST_API_overview](/src/REST_API_overview.png)

NUGU 플랫폼에서는 Backend proxy를 구축할 수 있는 클라우드 환경을 제공하지 않음. <br>
play를 개발하는 곳에서 직접 구축을 하거나 클라우드 서비스를 이용해야 하는데 우리는 AWS의 EC2를 사용할 예정 <br>

![Backend_construct_process](/src/Backend_construct_process.png)

Play Builder에 Action별로 설정된 정보를 기반으로 Action 당 하나의 REST API 포맷을 파악하고 Backend proxy 호출을 필요로 하는 Action 수만큼의 REST API를 지원하는 서버를 개발 해야함.<br> 
따라서 Play 외부 연동 서버 개발을 하려면 3번째 단계에서 REST API 포맷을 파악하는 방법을 이해하면 됨. <br><br>
Backend proxy API 규격은 다음과 같은 정보를 Backend proxy 서버로 전달합니다. <br>

| 정보 | 설명 |
| ---- | ---- |
|Action <br>이름|Backend proxy에서 처리해야 하는 요청을 구분하는 데 사용됩니다.   어떠한 Action이 Backend proxy를 호출했는지 확인할 수 있습니다. (Aciont은 함수라고 생각)|
|Parameters|Play에서 정의된 Parameter들이 전달.<br>    Utterance Parameter에는 Play 사용자의 실제 발화에 담긴 Entity 혹은 그 Entity가 정규화된 값이 "value"로 전달.<br>   Backend Parameter는 "value"를 담아서 Play로 전달하게 될 Parameter, value는 "null"로 전달.   Utterance/Backend Parameter를 구분할 수 없으므로, Play에서 어떻게 정의를 했는지 파악한 후 구현해야 함.|
|Context<br>정보|사용자 식별 token, 디바이스 상태 정보 등.|
|Event 정보|디바이스에서 발생한 Event 정보|<br><br>

## REST API URL
<br>
REST API 호출은 Backend proxy 사용하도록 지정한 Action에서만 이루어짐. <br>
각 Action 별로 고유한 REST API URL 결정.
<br>
REST API URL 생성 규칙은 다음과 같음.<br>
- Play Builder > General > 외부 서버 연결 정보 > Web URL + Play Builder > Actions > Action Name<br>
<br>
예) 외부 서버 연결 정보 Web URL이 http://backend_proxy.nugu.com 설정하고, Action 이름이 "order_burger"로 설정했다면 해당 Action 처리 REST API URL은<br>
http://backend_proxy.com/order_burger<br><br>

## 왜 GET 방식이 아닌 POST 방식을 사용해야 하는가?

GET POST 요청 둘 다 백엔드 서버로 들어옴 <br>
누구에서 GET POST 요청 둘 다 보내는데 post로 해야하는 이유는 <br>
NUGU에서 url은 하나이기 때문에 GET으로 하면 /order_burger/<str:버거이름> 이 url로 GET을 보내야 하는데 <br>
누구에서 동적 url을 못 날려줘서 post로 방법을 바꿔야함. <br>

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
