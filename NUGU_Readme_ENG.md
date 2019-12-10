## General Setting
### Backend Proxy Server
#### Web URL : TBA
#### Exception message : "Err Code 404 서버에 연결하지 못했습니다"


## Intent

### A. Welcome.with.NUGU.INTENT.open
- Precondition : In case play session entry is the Innovation Name NUGU.For INTENT.open 
(In case “Start/Open” is mentioned with the Invocation name)

- Does this INTENT need backend proxy? YES

- Output : 안녕하세요 비스킷입니다. 무엇을 주문하시겠어요? 메뉴 하나씩 주문해주세요.<br><br>


### B. Order
<ol>

#### <li> Order request

- Command : (menu), (count), (ending of word)
  <br> ex) 불고기와퍼 한 개 줘 <br>
  
|Example mention|불고기 와퍼|한 개|줘|
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

### <li> Action for Order Intent : order_confirm 

<br>
Prompt<br>

|(NUGU response)|불고기 와퍼|한 개|주문되었습니다|더 주문할 것 있으신가요?|
|------|----|-----|-|-------|
|Category|menu|count|mention|mention|
|Utterance parameter|{{menu}}|{{count}}|fixed statement|fixed statement|

<br>

- Repeat Order Intent until Intent named End_Order is requested.

</ol>


### C. Ask something

<ol>

#### <li> ask.taste

- ask some menu is salty or not.
- Command : (menu), (ending of word)<br>
  ex) 불고기와퍼 싱거워? <br>
  
|Example mention|불고기 와퍼|싱거워?|
|------|----|------|
|Category|menu|ending of word|
|Entity|MENU|TASTE|
<br>

- Does this INTENT need backend proxy? NO

- Action for ask.taste : answer_taste <br>
- Prompt<br>

|(NUGU response)|불고기 와퍼|는|짠편입니다|
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

|Example mention|더 주문할거 없어|
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

<br>
Prompt<br>

|(NUGU response)|주문이 완료되었습니다|
|------|----|
|Category|statement|
|Utterance parameter|fixed statement|

<br>

</ol>

### E. Check ordered Menu

## Entitiy

### A. Menu
- Menus to order

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
- Quantity of menu

|Parameter|Synonym|
|---------|-------|
|1|한개, 하나|
|2|두개|
|3|세개|
|...|...|

### C. END
- Indicate the termination of order.
- 
|Parameter|Synonym|
|---------|-------|
|END|END, 더 없어, 주문끝, 없어, 없습니다, ...|

### D. Statement
- Conjunctive Ending
  
|Parameter|Synonym|
|---------|-------|
|주세요|줘, 요, 주세요, 줘요|

## Actions

### A. NUGU.ACTION.Welcome

<ul>
<li>  Action when first entering a play
<li> Play call name (Invocation name) and NUGU, as shown in '아리야 VISQUIT 시작' in Device Standby (IDLE).When igniting INTENT.open together,<br>
- In this case, the Prompt corresponding to 'Invocation name only' will be mentioned, after which Prompt will be switched on, and the Prompt will be referred to as 'Standby Prompt'.
<li> This action is taken when the user enters the play by mentioning the name of the play and the Custom Intent inside the play, such as '아리야 VISQUIT에서 아이스아메리카노 한잔 줘' in the Device Standby (IDLE).<br>
- In this case, the Prompt corresponding to the 'Invocation name and Intent' are glued to the front of the response These are called 'continuous Prompt'.
</ul>



### B. NUGU.ACTION.exit
  <ul>
  <li> NUGU, where the user is in the Play session, including '주문 종료' and '더 주문할거 없어'.Operation is performed when INTENT.stop is in placed.
  <li> After Prompt has been triggered, the session ends and returns to the IDLE state. These Prompts are referred to as 'End Prompt'.
  </ul>

### C. NUGU.ACTION.rewind
<ul>
<li>NUGU, for example, user '다시'.Action in case of ignition corresponding to INTENT.rewind.
<li>This action does not have a response and performs a command to play the most recent response from scratch.
</ul>

  
### D. NUGU.ACTION.fallback
<ul>
<li> Action triggered in case of not being able to handle this play
<li> This will work if the user has made a mention within the Play session but does not have the Intent to process.
<li> Action that works when the user says '다시'
<li> A situation with no Intent to process, i.e. a Fallback situation, is a complex type that mixes the end type and the standby type to form Prompt.
</ul>



### E. Order_confirm
<ul>
<li>Confirm the order to the customer and send the order to the server
</ul>

### F. End_order
<ul>
<li> A function that terminates an order.
<li> When this function is enabled, it informs the server that the order has been terminated.
</ul>

### G. Check_order
<ul>
<li> Request when you want to check the customer's order
<li> Invoke orders from the database and forward them through the server to the NUGU speaker to speak to the customer.
</ul>
