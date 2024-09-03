import { apiSlice } from "./apiSlice";
import { ORDERS_URL,PAY_UPLOAD_URL,PAYPAL_URL } from "./features/constants";

export const orderApiSlice=apiSlice.injectEndpoints({
  endpoints:(builder)=>({
    createOrder:builder.mutation({
      query: (order)=>
      ( { 
        url:ORDERS_URL,
      method:'POST',
      body:order
    })
    }),

    getOrderDetails:builder.query({
      query:(id)=>({
        url:`${ORDERS_URL}/${id}`
      })
    }),

    payOrder:builder.mutation({
      query:({orderId})=>({
        url:`${ORDERS_URL}/${orderId}/pay`,
        method:"PUT",
        
      })
    }),
    getPaypalClientId: builder.query({
      query: () => ({
        url: PAYPAL_URL,
      }),
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}/mine`,
        method:"GET"
      }),
      keepUnusedDataFor: 5,
    }),

    getAllOrders: builder.query({
      query: () => ({
        url: `${ORDERS_URL}`,
        method:"GET"
      }),
    }),

    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: "PUT",
      }),
    }),

    getTotalOrders: builder.query({
      query: () => `${ORDERS_URL}/total-orders`,
    }),

    getTotalSales: builder.query({
      query: () => `${ORDERS_URL}/total-sales`,
    }),

    getTotalSalesByDate: builder.query({
      query: () => `${ORDERS_URL}/total-sales-by-date`,
    }),
    uploadPayImage:builder.mutation({
      query:(data)=>({
        url:`${PAY_UPLOAD_URL}`,
        method:"POST",
        body:data
    }) 
    })

  })
})


export const {
  useGetTotalOrdersQuery,
  useGetTotalSalesQuery,
  useGetTotalSalesByDateQuery,
  // ------------------
  useCreateOrderMutation,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetMyOrdersQuery,
  useDeliverOrderMutation,
  useGetAllOrdersQuery,
  useUploadPayImageMutation
} = orderApiSlice;