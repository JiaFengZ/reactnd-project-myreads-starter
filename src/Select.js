import React from 'react'
import './App.css'

class Select extends React.Component {
    state = {
        value: this.props.value,
        books: []
    }

    handleChange(e) {
        this.props.selectCallback(e)
    }

    render() {
        return (
            <select onChange={(e) => this.props.selectCallback(e)} value={this.props.value}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
              </select>
        )
    }
}

export default Select;