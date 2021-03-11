import React, { Component } from 'react'
import styles from './home.module.scss'
import { Card, CardContent, Typography } from '@material-ui/core'
import GitHubButton from 'react-github-btn'
import RegistrationFinish  from '../RegistrationFinish/RegistrationFinish'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class Home extends Component {
  render() {
    const { user } = this.props

    return (
      <div className={ styles.home }>
        {
          user && !user.active ?
          <RegistrationFinish></RegistrationFinish> :
          null
        }
        
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    url: state.url,
    authenticated: state.authenticated,
    notification: state.notification,
    user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Home))
