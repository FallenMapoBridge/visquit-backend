# NUGU Play kit

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


GET POST 요청 둘 다 백엔드 서버로 들어옴
누구에서 GET POST 요청 둘 다 보내는데
post로 해야하는 이유는
NUGU에서 url은 하나이기 때문에 GET으로 하면 /Burger/<str:버거이름> 이 url로 GET을 보내야 하는데
누구에서 동적 url을 못 날려줘서 post로 방법을 바꿔야함.