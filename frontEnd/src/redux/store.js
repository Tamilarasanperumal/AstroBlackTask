// store.js
import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './user';
import { itemMaster } from './itemService';
import { uomMaster } from './UomMasterService';
import { inventory } from './InventoryService';
import { consumption } from './ConsumptionService';




const commonMiddleware = [
    userApi.middleware,
    itemMaster.middleware,
    inventory.middleware,
    consumption.middleware,
    uomMaster.middleware,
];





const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        [itemMaster.reducerPath]: itemMaster.reducer,
        [uomMaster.reducerPath]: uomMaster.reducer,
        [inventory.reducerPath]: inventory.reducer,
        [consumption.reducerPath]: consumption.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(commonMiddleware),
});

export default store;