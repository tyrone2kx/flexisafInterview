import React, { useState } from 'react'
import Header from '../components/Header'

const Question2 = (props) => {

    const [result, setResult] = useState('');
    const [text, setText] = useState('');

    const onTextChange = (e) => {
        const value = e.target.value;
        setText(value);
    }

    const board = [
        ['s', 'o', 's', 'o'],
        ['s', 'o', 'o', 's'],
        ['s', 's', 's', 's']
    ]


    function exist(board, word) {

        const rowLength = board.length
        const colLength = board[0].length

        let count = 0

        // Loop through each element in the matrix to find a matching index with the text index
        // Return a truthy value on each match
        // Increment the count variable if returned value is true

        for (var i = 0; i < rowLength; i++) {
            for (var j = 0; j < colLength; j++) {
                if (board[i][j] === word[0]) {

                    // Check for a horizontal match
                    if (searchHorizontal(word, i, j, 0, board)) {
                        count++
                    }

                    // Check for a vertical match
                    if (searchVertical(word, i, j, 0, board)) {
                        count++
                    }

                    // Check for a diagonal match
                    if (searchDiagonal(word, i, j, 0, board)) {
                        count++
                    }
                }
            }

        }

        return count
    }


    function searchVertical(word, row, col, index, board) {
        const rowLength = board.length

        if (index === word.length - 1) {
            return true
        }

        // Vertical means (row + 1)(col + 0)
        // Check that (row + 1)(col + 0) falls within the boundaries of the matrix

        if (row < rowLength - 1 && board[row + 1][col] === word[index + 1] && searchVertical(word, row + 1, col, index + 1, board)) {
            return true
        }

        return false
    }


    function searchHorizontal(word, row, col, index, board) {
        const colLength = board[0].length

        if (index === word.length - 1) {
            return true
        }

        // Horizontal means (row + 0)(col + 1)
        // Check that (row + 0)(col + 1) falls within the boundaries of the matrix

        if (col < colLength - 1 && board[row][col + 1] === word[index + 1] && searchHorizontal(word, row, col + 1, index + 1, board)) {
            return true
        }
        return false
    }



    function searchDiagonal(word, row, col, index, board) {
        const rowLength = board.length
        const colLength = board[0].length

        if (index === word.length - 1) {
            return true
        }

        // Diagonal means (row + 1)(col + 1)
        // Check that (row + 1)(col + 1) falls within the boundaries of the matrix

        if (col < colLength - 1
            && row < rowLength - 1
            && board[row + 1][col + 1] === word[index + 1]
            && searchDiagonal(word, row + 1, col + 1, index + 1, board)) {
            return true
        }

        return false
    }






    return (
        <div>
            <Header />
            <div className='page_body'>
                <div className='page_container_50'>
                    <div className='page_inner'>
                        <div className='question_container'>
                            <p>2.{')'} Given a rectangular matrix of English lowercase letters board and a sting word,
                            your task is to find the number of occurrences of word in the rows {'(→)'}, columns{'(↓)'} and diagonals {'(↘)'} ofboard</p>
                        </div>


                        <div className='table_container'>
                            <table className='table'>
                                <tbody>
                                    {board.map((item, index) => {
                                        return <tr className='table_body_row' key={index}>
                                            {item.map((subItem, subIndex) => (
                                                <td key={subIndex}>{subItem}</td>
                                            ))}
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>


                        <h3 style={{ textAlign: 'center' }}>{result}</h3>

                        <div className='button_holder'>
                            <input placeholder='Type A Word' value={text} onChange={onTextChange} className='q_input' />
                            <button className='btn forward_btn' onClick={() => setResult(`Result is ${exist(board, text)}`)} >CALCULATE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Question2;




