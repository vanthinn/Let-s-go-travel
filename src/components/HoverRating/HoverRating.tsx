import * as React from 'react'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'

const labels: { [index: string]: string } = {
 0.5: '1 sao',
 1: '1 sao',
 1.5: '2 sao',
 2: '2 sao',
 2.5: '3 sao',
 3: '3 sao',
 3.5: '4 sao',
 4: '4 sao',
 4.5: '5 sao',
 5: '5 sao',
}

interface IProps {
 value: number | null
 setValue?: (rate: number | null) => Promise<void>
 isHover: boolean
 precision: number
 css?: string
}

function getLabelText(value: number) {
 return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`
}

export default function HoverRating({
 value,
 setValue,
 isHover,
 precision,
 css,
}: IProps) {
 const [hover, setHover] = React.useState(-1)
 console.log(hover)

 return (
  <Box
   sx={{
    width: 200,
    display: 'flex',
    alignItems: 'center',
    justifyContent: css === undefined ? 'center' : '',
   }}>
   <Rating
    name="hover-feedback"
    value={value}
    precision={precision}
    readOnly={!isHover}
    getLabelText={getLabelText}
    onChange={(_event, newValue) => {
     setValue && setValue(newValue)
    }}
    onChangeActive={(_event, newHover) => {
     isHover && setHover(newHover)
    }}
    emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
   />
  </Box>
 )
}
