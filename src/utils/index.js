import axios from "axios"
import moment from "moment";
moment.locale('fr')

export const developmentUrl = import.meta.env.NODE_ENV === "production" ? null : import.meta.env.VITE_ORIGINE

// export const developmentUrl = import.meta.env.VITE_ORIGINE

export const customFetch = axios.create({
    baseURL: developmentUrl,
});

export const formatDate = (date) => {
    const formattedDate = moment(date).format('LL')
    return formattedDate
}