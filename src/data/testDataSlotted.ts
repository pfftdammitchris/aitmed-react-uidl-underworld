const border = `border:
                  style: 4`
const header = 'text: Prescription Refills'
const title = `text: This is the title`
const description = `text: Hello fdskifmokisdmfoks`
const btnText = `text: Refill`

export default `
pageName: NotificationDetail
dataModels:
  notificationDetail:
    source:
      api: rd
      appDataType: 'xxx' ## appoint type
      xfname: bvid | evid ## appointments created by me or for me
    dataModel:
      - notificationType
      - drAvatar
      - date
      - detail
      - file
components:
  - type: header
    componentId: header
    className: header
    style:
      ${border}
    children:
      - type: button
        componentId: leftButton
        path: backarrow.png
        text: Back
        className: leftButton
        onClick: goToProfile
  - type: view
    componentId: bodyContainer
    style:
      left: '0'
      top: '0.05'
      width: '1'
      height: '1'
    children:
      - type: label
        componentId: prescriptionLabel
        dataModel: notificationDetail
        dataId: notificationType
        ${header}
        style:
          left: '0.058'
          top: '0.0357'
          width: '0.7246'
          height: '0.0335'
          color: '0x3185c7ff'
          fontSize: '24'
          fontStyle: bold
      - type: view
        componentId: detailContainer
        style:
          ${border}
          left: '0.058'
          top: '0.0357'
          width: '0.7246'
          height: '0.0335'
        children:
          - type: image
            componentId: avatar
            dataModel: notificationDetail
            dataId: drAvatar
            path: drImg.png
            style:
              left: '0'
              top: '0.105'
              width: '0.16'
              height: '0.0817'
              border:
                style: '5'
              borderRadius: '30'
          - type: label
            componentId: dataLabel
            dataModel: notificationDetail
            dataId: date
            ${title}
            style:
              left: '0.2'
              top: '0.12'
              width: '0.7246'
              height: '0.0335'
              color: '0x0000008c'
              fontSize: '14'
          - type: label
            componentId: detailLabel
            dataModel: notificationDetail
            dataId: detail
            ${description}
            style:
              left: '0.2'
              top: '0.15'
              width: '0.7246'
              height: '0.0335'
              color: '0x00000058'
              fontSize: '13'
          - type: button
            componentId: notificationButton
            dataModel: notificationDetail
            dataId: notificationType
            onClick: confirmationPopUp
            ${btnText}
            style:
              color: '0xffffffff'
              left: '0.65'
              top: '0.12'
              width: '0.2'
              height: '0.05'
              fontSize: '13'
              backgroundColor: '0x3185c7ff'
              border:
                style: '5'
                width: '2'
                color: '0x000000ff'
              borderRadius: '5'
      - type: view
        componentId: downLoadContainer
        style:
          ${border}
          left: '0.12'
          top: '0.25'
          width: '0.7246'
          height: '0.04'
        children:
          - type: image
            componentId: downloadIcon
            path: downloadIcon.png
            style:
              left: '0'
              top: '0'
              width: '0.06'
              height: '0.04'
              ${border}
          - type: image
            componentId: plusIcon
            path: plusIcon.png
            style:
              left: '0.55'
              top: '0'
              width: '0.06'
              height: '0.04'
              ${border}
          - type: image
            componentId: minusIcon
            path: minusIcon.png
            style:
              left: '0.66'
              top: '0'
              width: '0.06'
              height: '0.04'
              ${border}
      - type: view
        componentId: previewContainer
        dataModel: notificationDetail
        dataId: file
        style:
          left: '0.12'
          top: '0.33'
          width: '0.7246'
          height: '0.0335'
          ${border}
  - type: footer
    componentId: footer
`
