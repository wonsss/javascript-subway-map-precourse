# 지하철 노선도 프로그램

## 기본 설계 방향

### MVC 디자인 패턴

- Model
- View
- Controller

### 유틸 분리

- [x] 숫자나 문자열을 하드코딩하지 않고 상수로 만들어 별도의 파일에 모은다. (constants.js)
- [x] HTML의 Elements를 별도의 파일에 모아서 유지보수하기 쉽게 모듈화한다.(elements.js)

## 기능 구현 목록

### 1. 기본 DOM 구현

- [x] 상단에 메뉴 버튼 4개(역관리, 노선관리, 구간관리, 지하철노선도출력)를 생성하고 각각 탭 전환 이벤트를 추가한다.
- class
  - [x] 역 관리 Tab의 class `.station-manager-tab`
  - [x] 노선 관리 Tab의 class `.line-manager-tab`
  - [x] 구간 관리 Tab의 class `.section-manager-tab`
  - [x] 지하철 노선도 출력 관리 Tab의 class `.map-print-manager-tab`
- [x] 각각 탭의 div는 클래스를 토글하는 이벤트를 붙여서 visibility를 관리한다.
- id, class
  - [x] 역 관리 button 태그는 `#station-manager-button` id값을 가진다.
  - [x] 노선 관리 button 태그는 `#line-manager-button` id값을 가진다.
  - [x] 구간 관리 button 태그는 `#section-manager-button` id값을 가진다.
  - [x] 지하철 노선도 출력 관리 button 태그는 `#map-print-manager-button` id값을 가진다.

### 2. [역 관리] 지하철 역 관련 기능

- [x] 지하철 역을 등록하고 삭제할 수 있다.
  - [x] (단, 노선에 등록된 역은 삭제할 수 없다)
- [x] 중복된 지하철 역 이름이 등록될 수 없다.
- [x] 지하철 역은 2글자 이상이어야 한다.
- [x] 지하철 역의 목록을 조회할 수 있다.
- id, class
  - [x] 지하철 역을 입력하는 input 태그는 `#station-name-input` id값을 가진다.
  - [x] 지하철 역을 추가하는 button 태그는 `#station-add-button` id값을 가진다.
  - [x] 지하철 역을 삭제하는 button 태그는 `.station-delete-button` class값을 가진다.

### 3. [노선 관리] 지하철 노선 관련 기능

- [x] 지하철 노선을 등록하고 삭제할 수 있다.
- [x] 중복된 지하철 노선 이름이 등록될 수 없다.
- [x] 노선 등록 시 상행 종점역과 하행 종점역을 입력받는다.
- [x] 지하철 노선의 목록을 조회할 수 있다.
- [x] 지하철 노선의 이름을 입력하는 input 태그는 `#line-name-input` id값을 가진다.
- id, class
  - [x] 지하철 노선의 상행 종점을 선택하는 select 태그는 `#line-start-station-selector` id값을 가진다.
  - [x] 지하철 노선의 하행 종점을 선택하는 select 태그는 `#line-end-station-selector` id값을 가진다.
  - [x] 지하철 노선을 추가하는 button 태그는 `#line-add-button` id값을 가진다.
  - [x] 지하철 노선을 삭제하는 button 태그는 `.line-delete-button` class값을 가진다.

### 4. [구간 관리] 지하철 구간 추가 기능

- [x] 지하철 노선에 구간을 추가하는 기능은 노선에 역을 추가하는 기능이라고도 할 수 있다.
  - [x] 역과 역사이를 구간이라 하고 이 구간들의 모음이 노선이다.
- [x] 하나의 역은 여러개의 노선에 추가될 수 있다.
- [x] 역과 역 사이에 새로운 역이 추가 될 수 있다.
- [x] 노선에서 갈래길은 생길 수 없다.
- id, class
  - [x] 지하철 노선을 선택하는 button 태그는 `.section-line-menu-button` class값을 가진다.
  - [x] 지하철 구간을 설정할 역 select 태그는 `#section-station-selector` id값을 가진다.
  - [x] 지하철 구간의 순서를 입력하는 input 태그는 `#section-order-input` id값을 가진다.
  - [x] 지하철 구간을 등록하는 button 태그는 `#section-add-button` id값을 가진다.

### 5. [구간 관리] 지하철 구간 삭제 기능

- [x] 노선에 등록된 역을 제거할 수 있다.
- [x] 종점을 제거할 경우 다음 역이 종점이 된다.
- [x] 노선에 포함된 역이 두개 이하일 때는 역을 제거할 수 없다.
- id, class
  - [x] 지하철 구간을 제거하는 button 태그는 `.section-delete-button` class값을 가진다.

### 6. [지하철 노선도 출력] 지하철 노선에 등록된 역 조회 기능

- [x] 노선의 상행 종점부터 하행 종점까지 연결된 순서대로 역 목록을 조회할 수 있다.
- id, class
  - [x] 지하철 노선도 출력 버튼을 누르면 `<div class="map"></div>` 태그를 만들고 해당 태그 내부에 노선도를 출력한다.
