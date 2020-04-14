import React from 'react'
import { ContentBlock, EditorBlock } from 'draft-js'

export function CodeBlock({ block, ...props }: { block: ContentBlock }) {
  const text = block.getText()
  return (
    <code style={{ fontSize: 12 }}>
      <EditorBlock block={block} {...props}>
        {text}
      </EditorBlock>
    </code>
  )
}

function blockRendererFn(block: ContentBlock) {
  // const data = contentState.getEntity(block.getEntityAt(0)).getData()
  return {
    component: CodeBlock,
    editable: true,
    props: {
      block,
    },
  }
}

export default blockRendererFn
