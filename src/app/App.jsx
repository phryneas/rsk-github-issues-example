import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RepoSearchForm } from 'features/repoSearch/RepoSearchForm'
import { IssuesListPage } from 'features/issuesList/IssuesListPage'
import { IssueDetailsPage } from 'features/issueDetails/IssueDetailsPage'
import {
  displayRepo,
  setCurrentDisplayType,
  setCurrentPage
} from 'features/issuesDisplay/issuesDisplaySlice'
import './App.css'
const App = () => {
  const dispatch = useDispatch()
  const { org, repo, displayType, page, issueId } = useSelector(
    state => state.issuesDisplay
  )
  const setOrgAndRepo = (org, repo) => {
    dispatch(displayRepo({ org, repo }))
  }
  const setJumpToPage = page => {
    dispatch(setCurrentPage(page))
  }
  const showIssuesList = () => {
    dispatch(setCurrentDisplayType({ displayType: 'issues' }))
  }
  const showIssueComments = issueId => {
    dispatch(setCurrentDisplayType({ displayType: 'comments', issueId }))
  }
  let content
  if (displayType === 'issues') {
    content = (
      <React.Fragment>
        <RepoSearchForm
          org={org}
          repo={repo}
          setOrgAndRepo={setOrgAndRepo}
          setJumpToPage={setJumpToPage}
        />
        <IssuesListPage
          org={org}
          repo={repo}
          page={page}
          setJumpToPage={setJumpToPage}
          showIssueComments={showIssueComments}
        />
      </React.Fragment>
    )
  } else if (issueId !== null) {
    const key = `${org}/${repo}/${issueId}`
    content = (
      <IssueDetailsPage
        key={key}
        org={org}
        repo={repo}
        issueId={issueId}
        showIssuesList={showIssuesList}
      />
    )
  }
  return <div className="App">{content}</div>
}
export default App
