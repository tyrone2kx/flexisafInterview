import React, { useEffect, useState } from 'react'
import Header from '../components/Header'

const Question1 = (props) => {


    const initialState = [
        ['F', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
        ['_', '_', '_', '_', '_', '_', '_', '_', '_', '_'],
    ]

    const [dataDisplay, setDataDisplay] = useState(initialState);
    const [xPosition, setxPosition] = useState(0)
    const [yPosition, setyPosition] = useState(0)


    const alterArray = (array, input, row, col) => {
        let data = array;
        let xPos = col;
        let yPos = row;

        // STARTING AT 0 INDEX

        if (input === 'forward') {
            if (col === 0) {
                data[row][col] = data[row][col + 1];
                data[row][col + 1] = "F";
                const x = xPos + 1;
                xPos = x;
                yPos = row;
            }

            // RESETING AT END OF ARRAY

            else if (col === data[row].length - 1 && row === data.length - 1) {
                data[row][col] = '_'
                data[0][0] = 'F';
                xPos = 0;
                yPos = 0;
            }

            // ROTATING AT END OF COLUMN

            else if (col === data[row].length - 1) { 
                if (row < data.length - 1) {
                    data[row + 1][col] = data[row][col];
                    data[row][col] = "_";
                    const y = yPos + 1;
                    yPos = y
                    xPos = col;

                }
            }
            else {
                data[row][col + 1] = data[row][col];
                data[row][col] = data[row][col - 1];
                const x = xPos + 1;
                xPos = x;
                yPos = row;
            }
        }

        // STARTING AT 0 INDEX

        else if (input === 'rotate') {
            if (row === 0) {
                data[row][col] = data[row + 1][col];
                data[row + 1][col] = "F";
                const y = yPos + 1;
                yPos = y
                xPos = col;
            }

            // RESET ON THAT COLUMN

            else if (row === data.length - 1) {
                data[0][col] = 'F';
                data[row][col] = "_";
                yPos = 0;
                xPos = col;
            }

            // ROTATE DOWNWARDS
            else {
                data[row + 1][col] = data[row][col];
                data[row][col] = data[row - 1][col];
                const y = yPos + 1;
                yPos = y
                xPos = col;
            }
        }
        setDataDisplay(data);
        setxPosition(xPos);
        setyPosition(yPos);

    }




    return (
        <div>
            <Header />
            <div className='page_body'>
                <div className='page_container_50'>
                    <div className='page_inner'>
                        <div className='question_container'>
                            <p>1.{')'} Create a 10 x 10 matrix with an F in the 0,0 box. There should be 2 buttons
                            “Forward” and“Rotate”. When the user presses Forward, the letter should move forward,
                            and when the userpresses Rotate, the letters orientation should change clockwise.
                            When the letter reaches theend of its path, another forward press should invoke
                            the rotate so that the Letter can keepmoving in the new orientation</p>
                        </div>

                        <div className='table_container'>
                            <table className='table'>
                                <tbody>
                                    {dataDisplay.map((item, index) => {
                                        return <tr className='table_body_row' key={index}>
                                            {item.map((subItem, subIndex) => (
                                                <td key={subIndex}>{subItem}</td>
                                            ))}
                                        </tr>
                                    })}

                                </tbody>
                            </table>
                        </div>

                        <div className='button_holder'>
                            {/* <button className='btn forward_btn' onClick={() => { const res = moveIndex('forward', yPosition, xPosition); console.log(res); xPosition = res.xPos; yPosition = res.yPos; setDataDisplay(res.data) }} >FORWARD</button> */}
                            <button className='btn forward_btn' onClick={() => alterArray(dataDisplay,'forward', yPosition, xPosition)} >FORWARD</button>
                            <button className='btn rotate_btn' onClick={() => { alterArray(dataDisplay,'rotate', yPosition, xPosition) }} >ROTATE</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



export default Question1




