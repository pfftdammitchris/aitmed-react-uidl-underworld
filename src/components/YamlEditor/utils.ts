import { List as ImmutableList, Record as ImmutableRecord } from 'immutable'
import detectNewline from 'detect-newline'
import detectIndent from 'detect-indent'
import endsWith from 'ends-with'
import { EditorState, Modifier } from 'draft-js'

const LineAnchor = ImmutableRecord({
  line: Number(0), // Index of current line
  offset: Number(0), // Offset in current line
})

LineAnchor.prototype.getLine = function () {
  return this.get('line')
}

LineAnchor.prototype.getOffset = function () {
  return this.get('offset')
}

/**
 * Return an anchor of a cursor in a block as a {line,offset} object
 *
 * @param { string } text
 * @param { number } offset
 * @param { string } seperator (optional)
 * @return { LineAnchor }
 */
export function getLineAnchorForOffset(
  text: string,
  offset: number,
  seperator: string = getNewLine(text),
) {
  let lineIndex = 0
  let nextLineIndex = 0
  let lastLineIndex = 0

  while (nextLineIndex >= 0 && nextLineIndex < offset) {
    lineIndex++
    lastLineIndex = nextLineIndex
    nextLineIndex = text.indexOf(seperator, nextLineIndex + seperator.length)
  }

  return new LineAnchor({
    line: lineIndex - 1,
    offset: offset - lastLineIndex,
  })
}

/**
 * Returns the indentation of a line
 * @param { string } line
 */
export function getIndentForLine(line: string): string {
  return detectIndent(line).indent || ''
}

/**
 * Detects indentation in texts
 * @param { string } text
 * @return { string }
 */
export function getIndentation(text: string): string {
  const result = detectIndent(text)
  return result.indent || '  '
}

/**
 * Return a list of line in this text
 * @param {String} text
 * @param {String} seperator (optional)
 */
export function getLines(
  text: string,
  seperator: string = getNewLine(text),
): ImmutableList<string> {
  return ImmutableList(text.split(seperator))
}

/**
 * Detect the newline character of a string
 * @param { string } text
 */
export function getNewLine(text: string) {
  return detectNewline(text) || '\n'
}

/**
 *  Insert a new line with the computed indentation applied
 *
 * @param { EditorState } editorState
 */
export function insertNewLine(editorState: EditorState) {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()
  const startKey = selectionState.getStartKey()
  const startOffset = selectionState.getStartOffset()
  const currentBlock = contentState.getBlockForKey(startKey)
  const blockText = currentBlock.getText()

  let newContentState

  // Detect newline separation
  const newLine = getNewLine(blockText)

  // Add or replace
  if (selectionState.isCollapsed()) {
    // Create line to insert with right indentation
    const lines = getLines(blockText, newLine)
    const currentLineIndex = getLineAnchorForOffset(
      blockText,
      startOffset,
      newLine,
      // @ts-ignore
    ).getLine()
    const currentLine = lines.get(currentLineIndex)
    const lineToInsert = newLine + getIndentForLine(currentLine)

    newContentState = Modifier.insertText(
      contentState,
      selectionState,
      lineToInsert,
    )
  } else {
    newContentState = Modifier.replaceText(
      contentState,
      selectionState,
      newLine,
    )
  }

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'insert-characters',
  )

  return EditorState.forceSelection(
    newEditorState,
    newContentState.getSelectionAfter(),
  )
}

/**
 * Removes the last indentation before cursor. Returns undefined if no
 *    modifications were done
 * @param { EditorState } editorState
 * @return { EditorState | undefined }
 */
export function removeIndent(
  editorState: EditorState,
): EditorState | undefined {
  const contentState = editorState.getCurrentContent()
  const selectionState = editorState.getSelection()

  if (!selectionState.isCollapsed()) {
    return
  }

  const startKey = selectionState.getStartKey()
  const startOffset = selectionState.getStartOffset()
  const currentBlock = contentState.getBlockForKey(startKey)
  const blockText = currentBlock.getText()

  // Detect newline separator and indentation
  const newLine = getNewLine(blockText)
  const indent = getIndentation(blockText)

  // Get the current line
  const lines = getLines(blockText, newLine)
  const lineAnchor = getLineAnchorForOffset(blockText, startOffset, newLine)

  // @ts-ignore
  const currentLine = lines.get(lineAnchor.getLine())
  // @ts-ignore
  const beforeSelection = currentLine.slice(0, lineAnchor.getOffset())

  // If the line before selectionState ending with the indentation?
  if (!endsWith(beforeSelection, indent)) {
    return
  }

  // Remove indent
  const beforeIndentOffset = startOffset - indent.length
  const rangeToRemove = selectionState.merge({
    focusKey: startKey,
    focusOffset: beforeIndentOffset,
    anchorKey: startKey,
    anchorOffset: startOffset,
    isBackward: true,
  })

  const newContentState = Modifier.removeRange(
    contentState,
    // @ts-ignore
    rangeToRemove,
    'backward',
  )
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'remove-range',
  )

  return EditorState.forceSelection(
    newEditorState,
    newContentState.getSelectionAfter(),
  )
}
