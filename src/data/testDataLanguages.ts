export default `
pageName: Languages
dataModels:
  languages:
    store :
      api : cd
      appDataType : "xxx" 
      eid : docRoot
    dataModel:
      - choosedLanguage
components:
  - type: header
    componentId: header
    className: header
    children:
      - type: button
        componentId: leftButton
        path: backarrow.png
        text: Back
        className: leftButton
        onClick: goToPersonalInfoEditMode
      - type: label
        componentId: headerTitle
        text: Languages
        className: headerTitle
        style:
          align: centerX
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
          top: "0.035"
          width: "1"
          height: "0.035"
          textAlign: centerX
      - type: scrollView
        componentId: scrollViewContainer
        style:
          left: "0"
          top: "0.086"
          width: "1"
          height: "0.9"
          contentSize:
            width: "1"
            height: "1.225"
        children:
          - type: label
            componentId: emptyLabl
            style:
              left: "0"
              top: "0.015"
              width: "1"
              height: "0.035"
              border:
                style: "4"
                color: "0x0000008c"
                width: "1"          
          - type: view
            componentId: englishContainer
            style:
              left: "0"
              top: "0.065"
              width: "1"
              height: "0.035"
              border:
                style: "4"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: englishLabel
                text: English
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: englishChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.6"
                  top: "0"
                  width: "0.2"  
          - type: view
            componentId: afrikaansContainer
            style:
              left: "0"
              top: "0.115"
              width: "1"
              height: "0.035"
              border:
                style: "4"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: afrikaansLabel
                text: Afrikaans
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: afrikaansChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: amharicContainer
            style:
              left: "0"
              top: "0.165"
              width: "1"
              height: "0.035"
              border:
                style: "4"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: amharicLabel
                text: Amharic
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: amharicChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: arabicContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: arabicLabel
                text: Arabic
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: arabicChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: bajuniContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: bajuniLabel
                text: Bajuni
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: bajuniChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: basqueContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: basqueLabel
                text: Basque
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: basqueChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: behdiniContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: behdiniLabel
                text: Behdini
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: behdiniChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: belorissainContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: belorissainLabel
                text: Belorissain
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: belorissainChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: belorissainContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: belorissainLabel
                text: Belorissain
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: belorissainChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: bengaliContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: bengaliLabel
                text: Bengali
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: bengaliChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: berBerContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: berBerLabel
                text: BerBer
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: berBerChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: bosnianContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: bosnianLabel
                text: Bosnian
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: bosnianChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: bravaneseContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: bravaneseLabel
                text: Bravanese
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: bravaneseChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: bulgarianContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: bulgarianLabel
                text: Bulgarian
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: bulgarianChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: burmeseContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: burmeseLabel
                text: Burmese
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: burmeseChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: cakchiquelContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: cakchiquelLabel
                text: Cakchiquel
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: cakchiquelChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: cambodainContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: cambodainLabel
                text: Cambodain
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: cambodainChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: cantoneseContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: cantoneseLabel
                text: Cantonese
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: cantoneseChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: catalanContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: catalanLabel
                text: Catalan
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: catalanChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: chaldeanContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: chaldeanLabel
                text: Chaldean
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: chaldeanChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: danishContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: danishLabel
                text: Danish
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: danishChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: dariContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: dariLabel
                text: Dari
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: dariChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: dinkaContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: dinkaLabel
                text: Dinka
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: dinkaChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: diulaContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: diulaLabel
                text: Diula
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: diulaChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: dutchContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: dutchLabel
                text: Dutch
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: dutchChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: estonianContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: estonianLabel
                text: Estonian
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: estonianChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: espanolContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: espanolLabel
                text: Espanol
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: espanolChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: frenchContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: frenchLabel
                text: French
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: frenchChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: fukieneseContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: fukieneseLabel
                text: Fukienese
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: fukieneseChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: fulaContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: fulaLabel
                text: Fula
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: fulaChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: gaddangContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: gaddangLabel
                text: Gaddang
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: gaddangChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: japaneseContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: japaneseLabel
                text: Japanese
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: japaneseChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: javaneseContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: javaneseLabel
                text: Javanese
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: javaneseChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: koreanContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: koreanLabel
                text: Korean
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: koreanChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
          - type: view
            componentId: kosovanContainer
            style:
              left: "0"
              top: "0.035"
              width: "1"
              height: "0.035"
              border:
                style: "2"
                color: "0x0000008c"
                width: "1"
            children:
              - type: label
                componentId: kosovanLabel
                text: Kosovan
                style:
                  left: "0"
                  top: "0"
                  width: "0.8"
                  height: "0.035"
                  color: "0x0000008c"                    
              - type: button
                componentId: kosovanChecked
                dataModel: languages
                dataId: choosedLanguage
                pathSelected: successMark.png
                style:
                  left: "0.8"
                  top: "0"
                  width: "0.2" 
`
