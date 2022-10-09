import { Download, Info } from "@mui/icons-material"
import { useEffect } from "react"
import { useState } from "react"
import { customAjax } from "../custom_ajax"
import { CustomRow } from "./admin_dashboard/custom_row"
import { Alert } from "./alert/comp"
import { Loading } from "./loading/comp"
import Section from "./section/comp"
export function DownloadCenter() {
    var [download_center_items, set_download_center_items] = useState(null)
    function fetch_data() {
        customAjax({
            params: {
                task_name : "get_download_center_items"
            }
        }).then(data => {
            set_download_center_items(data.result)
        }, e => {
            alert('something went wrong while requesting data from server')
            console.log(e)
        })
    }
    useEffect(fetch_data,[])
    return (
        <>
            
            {download_center_items === null ? (
                <Loading />
            ) : (
                    <Section title="downloadble items"
                    className='mt-1'>
                        <div className="px-3">
                            <Alert
                                icon={<Info />}
                                className="mb-2"
                            >to download each item right click on that and click "save link as ..."</Alert>
                            {download_center_items.map((item,index) => {
                                return (
                                    <a
                                        key={index}
                                        href={new URL(`/download_center/${item}`, window.api_endpoint).href}
                                        download
                                        className="px-1 block bg-blue-100 mb-1 hover:bg-blue-500 w-fit hover:text-white rounded"
                                    >
                                        <Download />downlaod "{item}"
                                    </a>
                                )
                            })}  
                        </div>
                    </Section>
                
            )}
        </>
    )
}