# NUGU Play kit

# Backend Proxy 구축하기

Play에서는 사용자의 발화를 분석한 내용을 기반으로 적절한 응답을 내보내 주거나 동작을 수행합니다. <br>
이 응답에 필요한 정보가 외부 서버로부터 가져와야 하는 경우는 REST API를 통해 요청해야 하며, 음악을 재생하는 등의 디바이스를 동작시키는 명령을 정의하는 것도 Backend proxy에서 처리해야 합니다. <br>
NUGU 플랫폼의 Dialog Manager는 지정된 포맷(Backend proxy API 규격)으로 요청을 하기 때문에 외부 서비스의 REST API 포맷이 Backend proxy API 규격과 다르다면 포맷을 변환해주기 위한 Backend proxy 서버를 개발해야 합니다.

![REST_API_overview](/src/REST_API_overview.png)

NUGU 플랫폼에서는 Backend proxy를 구축할 수 있는 클라우드 환경을 제공하지 않음. <br>
play를 개발하는 곳에서 직접 구축을 하거나 클라우드 서비스를 이용해야 하는데 우리는 AWS의 EC2를 사용할 예정 <br>

# 왜 GET 방식이 아닌 POST 방식을 사용해야 하는가?

GET POST 요청 둘 다 백엔드 서버로 들어옵니다 <br>
누구에서 GET POST 요청 둘 다 보내는데 post로 해야하는 이유는 <br>
NUGU에서 url은 하나이기 때문에 GET으로 하면 /Burger/<str:버거이름> 이 url로 GET을 보내야 하는데 <br>
누구에서 동적 url을 못 날려줘서 post로 방법을 바꿔야합니다. <br>



## Intent

### A. Order
<ol>

#### <li> order.burger

- order only burger.

#### <li> order.set

- order a set of burger.

#### <li> order.side

- order side menu like frech fry.

#### <li> order.beverage

- order a beverage like cola.

#### <li> order.morning

- order morning set like mc morning.
  
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

