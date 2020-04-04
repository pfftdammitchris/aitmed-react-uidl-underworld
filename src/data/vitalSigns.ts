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
      top: '0'
      width: '1'
      height: '1'
    children:
      - type: label
        componentId: prescriptionLabel
        dataModel: notificationDetail
        dataId: notificationType
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
              left: '0.08'
              top: '0.02'
              width: '0.16'
              height: '0.0817'
              border:
                style: '5'
              borderRadius: '30'
          - type: label
            componentId: dataLabel
            dataModel: notificationDetail
            dataId: date
            style:
              left: '0.058'
              top: '0.0357'
              width: '0.7246'
              height: '0.0335'
              color: '0x0000008c'
              fontSize: '14'
          - type: label
            componentId: detailLabel
            dataModel: notificationDetail
            dataId: detail
            style:
              left: '0.058'
              top: '0.0357'
              width: '0.7246'
              height: '0.0335'
              color: '0x00000058'
              fontSize: '13'
          - type: button
            componentId: notificationButton
            dataModel: notificationDetail
            dataId: notificationType
            onClick: confirmationPopUp
            style:
              color: '0xffffffff'
              left: '0.3'
              top: '0.72'
              width: '0.4'
              height: '0.0408'
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
          left: '0.058'
          top: '0.0357'
          width: '0.7246'
          height: '0.0335'
        children:
          - type: image
            componentId: downloadIcon
            path: downloadIcon.png
            style:
              left: '0.08'
              top: '0.02'
              width: '0.16'
              height: '0.0817'
          - type: image
            componentId: plusIcon
            path: plusIcon.png
            style:
              left: '0.08'
              top: '0.02'
              width: '0.16'
              height: '0.0817'
          - type: image
            componentId: minusIcon
            path: minusIcon.png
            style:
              left: '0.08'
              top: '0.02'
              width: '0.16'
              height: '0.0817'
      - type: view
        componentId: previewContainer
        dataModel: notificationDetail
        dataId: file
        style:
          left: '0.058'
          top: '0.0357'
          width: '0.7246'
          height: '0.0335'
  - type: footer
    componentId: footer
`
