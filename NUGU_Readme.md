
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

## Intent

### A. Order
<ol>

#### <li> order

- Command : (menu), (count), (ending of word)
- ex) 불고기와퍼 한 개 줘 <br>
  
발화 예시|불고기 와퍼|한 개|줘|
|------|----|-----|-|
|Category|menu|count|ending of word|
|Entity|MENU|BID_QT_COUNT|STATEMENT|

- 
</ol>


### B. Ask something

<ol>

#### <li> ask.taste

- ask some menu is salty or not.

#### <li> ask.spicy

- ask some menu is spicy of not.

#### <li> ask.recommend

- ask to recommend delicious menu.

</ol>

## Entitiy

### A. Burgers

<ol>

#### <li> variety kinds of burgers

</ol>

### B. Sets

### C. Sides

### D. Beverages

### E. BID_QT_COUNT (default entity)

<ol>

##### <li> quantity (one, two, three, ... )

</ol>

## Actions

### A. Custom Actions

<ol>

#### <li> TBA

</ol>

### B. Built-in Actions 

<ol>

#### <li> TBA

</ol>

