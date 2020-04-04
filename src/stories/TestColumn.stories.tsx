import React from 'react'
import styled from 'styled-components'
import { prynote } from 'app/client'

export default {
  title: 'TestColumn',
}

const StyledRoot = styled.div`
  padding: 12px;
  width: 100%;
  box-sizing: border-box;
  background: rgba(0, 0, 0, 0.8);
  color: #fff;
`

const StyledField = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  .label {
    min-width: 100px;
  }
  select,
  input {
    outline: none;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.2);
    padding: 6px 12px;
    cursor: pointer;
  }
`

export const TestColumn = ({
  baseUrl = 'https://public.aitmed.com/alpha',
  history,
}: any) => {
  const [page, setPage] = React.useState('1_SignIn')
  const [pageKeys, setPageKeys] = React.useState([])

  React.useEffect(() => {
    prynote.uidl
      .getUIDL('https://public.aitmed.com/alpha/uidlEndpoint.yml')
      .then(({ startPage, page: pageList = [] }) => {
        setPageKeys(pageList)
        if (page !== startPage) setPage(startPage)
      })
      .catch((err: Error) => {
        console.error(err)
      })
    // eslint-disable-next-line
  }, [])

  React.useEffect(() => {
    history.push(page)
  }, [history, page])

  function onPageSelect(e: React.ChangeEvent<HTMLSelectElement>) {
    setPage(e.target.value)
  }

  return (
    <StyledRoot>
      <StyledField>
        <div style={{ marginBottom: 8 }} className="label">
          Select page
        </div>
        <select name="page" value={page} onChange={onPageSelect}>
          {pageKeys.map((pageKey: string) => (
            <option key={pageKey} value={pageKey}>
              {pageKey}
            </option>
          ))}
        </select>
      </StyledField>
    </StyledRoot>
  )
}
