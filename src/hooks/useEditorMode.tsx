import React from 'react'

export type EditorMode = 'yaml' | 'component-board'

function useEditorMode({
  initialValue = 'yaml',
}: { initialValue?: EditorMode } = {}) {
  const [editorMode, setEditorMode] = React.useState<
    'yaml' | 'component-board'
  >(initialValue)

  /** Invokes after a change event occurs from a react element
   * @param { function } event - onChange handler
   * @param { string } nextMode - Editor mode
   */
  function onEditorModeChange(e: React.ChangeEvent<any>, nextMode: EditorMode) {
    if (nextMode !== editorMode) {
      setEditorMode(nextMode)
    }
  }

  return {
    editorMode,
    onEditorModeChange,
    setEditorMode,
  }
}

export default useEditorMode
