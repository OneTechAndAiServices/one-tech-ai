import { Box } from '@mui/material'
import React from 'react'
import ProductList from './ProductList'
import AllProducts from './AllProducts'

function Product() {
  return (
    <>
    <Box mt={12}>
      <ProductList/>
      <AllProducts/>
        

    </Box>
    </>
  )
}

export default Product