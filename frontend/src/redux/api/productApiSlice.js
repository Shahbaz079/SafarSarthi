import { apiSlice } from "./apiSlice";
import { PRODUCT_URL,UPLOAD_URL } from "./features/constants";

export const productApiSlice=apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    getProducts:builder.query({
      query:({keyword})=>({
        url:`${ PRODUCT_URL}`,
        params:{keyword},
      }),
      keepUnusedDataFor:5,
      providesTags:["products"],
    }),

    getProductById:builder.query({
      query:(productId)=>`${PRODUCT_URL}/${productId}`,
      providesTags:(result,error,productId)=>[
        {type:"Product",id:productId,}
      ]
    }),
    
    allProducts:builder.query({
query:()=>`${PRODUCT_URL}/allproducts`,
    }),

    getProductDetails:builder.query({
      query:(productId)=>({
        url:`${PRODUCT_URL}/${productId}`
      }),
      keepUnusedDataFor:5,
    }),

    uploadImage:builder.mutation({
      query:(data)=>({
        url:`${UPLOAD_URL}`,
        method:"POST",
        body:data
      })
    }),

    createProduct:builder.mutation({
      query:(productData)=>({
        url:`${PRODUCT_URL}`,
        method:"POST",
        body:productData
      }),
      invalidatesTags:["Product"]
    }),

    updateProduct:builder.mutation({
      query:({productId,formData})=>({
        url:`${PRODUCT_URL}/${productId}`,
        method:'PUT',
        body:formData
      })
    }),

    deleteProduct:builder.mutation({
      query:({productId})=>({
        url:`${PRODUCT_URL}/${productId}`,
        method:'DELETE'
      }),
      providesTags:["Product"]
    }),
    createReviews:builder.mutation({
      query:(data)=>({
        url:`${PRODUCT_URL}/${data.productId}/reviews`,
        method:"POST",
        body:data
      })
    }),

    getTopProducts:builder.query({
      query:()=>`${PRODUCT_URL}/top/product`,
      keepUnusedDataFor:5,
    }),

    getNewProducts:builder.query({
      query:()=>`${PRODUCT_URL}/new/product`,
      keepUnusedDataFor:5,
    }),

    getFilterProducts:builder.query({
      query:({checked,radio})=>({
        url:`${PRODUCT_URL}/filtered-products`,
        method:'POST',
        body:{checked,radio}
      })
    })
    

  })
});

export const {
useGetProductByIdQuery,
useGetProductsQuery,
useGetProductDetailsQuery,
useAllProductsQuery,
useCreateProductMutation,
useUpdateProductMutation,
useDeleteProductMutation,
useCreateReviewsMutation,
useUploadImageMutation,
useGetNewProductsQuery,
useGetTopProductsQuery,
useGetFilterProductsQuery
}=productApiSlice