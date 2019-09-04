import React, { useState } from 'react'
import './pure-forms.css'
import './pure-buttons.css'
export const RepoSearchForm = ({ org, repo, setOrgAndRepo, setJumpToPage }) => {
  const [currentOrg, setCurrentOrg] = useState(org)
  const [currentRepo, setCurrentRepo] = useState(repo)
  const [currentPageText, setCurrentPageText] = useState('1')
  const onOrgChanged = e => {
    setCurrentOrg(e.target.value)
  }
  const onRepoChanged = e => {
    setCurrentRepo(e.target.value)
  }
  const onCurrentPageChanged = e => {
    setCurrentPageText(e.target.value)
  }
  const onLoadRepoClicked = () => {
    setOrgAndRepo(currentOrg, currentRepo)
  }
  const onJumpToPageClicked = () => {
    const newPage = parseInt(currentPageText)
    if (newPage >= 1) {
      setJumpToPage(newPage)
    }
  }
  return (
    <form className="pure-form">
      <div>
        <label htmlFor="org" style={{ marginRight: 5 }}>
          Org:
        </label>
        <input name="org" value={currentOrg} onChange={onOrgChanged} />
        <label htmlFor="repo" style={{ marginRight: 5, marginLeft: 10 }}>
          Repo:
        </label>
        <input name="repo" value={currentRepo} onChange={onRepoChanged} />
        <button
          type="button"
          className="pure-button pure-button-primary"
          style={{ marginLeft: 5 }}
          onClick={onLoadRepoClicked}
        >
          Load Repo
        </button>
      </div>
      <div style={{ marginTop: 5 }}>
        <label htmlFor="jumpToPage" style={{ marginRight: 5 }}>
          Issues Page:
        </label>
        <input
          name="jumpToPage"
          value={currentPageText}
          onChange={onCurrentPageChanged}
        />
        <button
          type="button"
          className="pure-button pure-button-primary"
          style={{ marginLeft: 5 }}
          onClick={onJumpToPageClicked}
        >
          Jump to Page
        </button>
      </div>
    </form>
  )
}
