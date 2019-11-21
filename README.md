# VISQUIT Backend

## Database

![Databse](/src/database.PNG)

### Table description
#### USER_TB(로그인한 점주에 대한 정보 테이블)
* user_id(PK): user(점주) id
* user_name: user의 이름

#### STORE_TB(가게에 대한 정보 테이블)
* store_id(PK): store의 id
* user_id(FK): reference USER_TB table 하나의 user는 여러 store를 소유 가능
* store_location: 가게의 위치 정보
* Store_tel: 가게의 전화번호
 
#### MENU_TB (가게의 메뉴에 대한 정보 테이블)
* menu_id(PK): menu의 id
* store_id(FK): reference STORE_TB table 하나의 store는 여러 개의 menu 소유 가능
* menu_name: 메뉴 이름
* Menu_price: 해당 메뉴 하나 당 가격

#### ORDERITEM_TB (단일 메뉴 주문에 대한 정보 테이블)
* item_id(PK): 하나의 item에 대한 id
* order_id(FK): reference ORDERS_TB table 하나의 order에는 여러 개의 item이 존재 가능
* menu_id(FK): reference MENU_TB table 하나의 menu는 여러 번 주문 될 수 있음
* Item_quantity: 해당 menu를 주문하려는 수량
* Item_price: menu_price * item_quantity

#### ORDERS_TB (한 번의 주문에 대한 정보 테이블) 여러 item이 모여서 하나의 order 구성
* order_id(PK): 주문에 대한 id 
* store_id(FK): reference STORE_TB table
* order_date: 주문 날짜
* order_num: 주문 번호(당일 몇 번째 주문)
* order_time: 주문 시간(timestamp)
* order_price: 주문의 총액(sum of item_price)
* serve_fl: 주문한 메뉴가 고객에게 제공되었는지 여부




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