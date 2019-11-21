# VISQUIT Backend

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