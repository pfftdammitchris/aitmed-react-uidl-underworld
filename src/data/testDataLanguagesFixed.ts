export default `
pageName: Languages
dataModels:
  languages:
    source: 
      api : rd
      appDataType : "xxx" 
      eid : docRoot
    store :
      api : cd
      appDataType : "xxx" 
      eid : docRoot
    dataModel:
      - language
      - isSelected
components:
  - type: header
    componentId: header
    className: header
    style:
      align: centerY
    children:
      - type: button
        componentId: leftButton
        path: backarrow.png
        text: Back
        className: leftButton
        onClick: goToPersonalInfoEditMode
      - type: label
        componentId: headerTItle
        text: Languages
        className: header
        style:
          textAlign:
            x: center
  - type: view
    componentId: bodyContainer
    style:
      left: "0"
      top: "0.0599"
      width: "1"
      height: "1"
    children:
      - type: label
        componentId: pleaseLable
        text: Please choose your language
        style:
          left: "0"
          top: "0.024"
          width: "1"
          height: "0.035"
          textAlign:
            x: center
      - type: list
        componentId: languageList
        dataModel: languages        
        style:
          left: "0"
          top: "0.1"
          width: "1"
          height: "0.9"
        children:        
          - type: view
            componentId: languageCell
            style:
              left: "0"
              top: "0.2"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x000000ff"
                width: "1"
            children:
              - type: label
                componentId: languageLabel
                dataModel: languages
                dataId: language
                style:
                  left: "0.1"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"    
              - type: button
                componentId: englishChecked
                dataModel: languages
                dataId: isSelected
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2"
                  height: "0.035"
`
