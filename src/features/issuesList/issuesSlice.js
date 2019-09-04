import { createSlice } from 'redux-starter-kit'
import { getIssue, getIssues } from 'api/githubAPI'
const issuesInitialState = {
  issuesByNumber: {},
  currentPageIssues: [],
  pageCount: 0,
  pageLinks: {},
  isLoading: false,
  error: null
}
function startLoading(state) {
  state.isLoading = true
}
function loadingFailed(state, action) {
  state.isLoading = false
  state.error = action.payload
}
const issues = createSlice({
  slice: 'issues',
  initialState: issuesInitialState,
  reducers: {
    getIssueStart: startLoading,
    getIssuesStart: startLoading,
    getIssueSuccess(state, { payload }) {
      const { number } = payload
      state.issuesByNumber[number] = payload
      state.isLoading = false
      state.error = null
    },
    getIssuesSuccess(state, { payload }) {
      const { pageCount, issues, pageLinks } = payload
      state.pageCount = pageCount
      state.pageLinks = pageLinks
      state.isLoading = false
      state.error = null
      issues.forEach(issue => {
        state.issuesByNumber[issue.number] = issue
      })
      state.currentPageIssues = issues.map(issue => issue.number)
    },
    getIssueFailure: loadingFailed,
    getIssuesFailure: loadingFailed
  }
})
export const {
  getIssuesStart,
  getIssuesSuccess,
  getIssueStart,
  getIssueSuccess,
  getIssueFailure,
  getIssuesFailure
} = issues.actions
export default issues.reducer
export const fetchIssues = (org, repo, page) => async dispatch => {
  try {
    dispatch(getIssuesStart())
    const issues = await getIssues(org, repo, page)
    dispatch(getIssuesSuccess(issues))
  } catch (err) {
    dispatch(getIssuesFailure(err.toString()))
  }
}
export const fetchIssue = (org, repo, number) => async dispatch => {
  try {
    dispatch(getIssueStart())
    const issue = await getIssue(org, repo, number)
    dispatch(getIssueSuccess(issue))
  } catch (err) {
    dispatch(getIssueFailure(err.toString()))
  }
}
