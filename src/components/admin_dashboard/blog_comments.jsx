import { useEffect, useState } from "react";
import { customAjax } from "../../custom_ajax";
import { CustomTable } from "../custom_table/comp";
import { Loading } from "../loading/comp";

export function BlogComments() {
    var [blog_comments, set_blog_comments] = useState(null)
    function fetch_data() {
        customAjax({
            params: {
                task_name : "get_all_blog_comments"
            }
        }).then(data => {
            set_blog_comments(data.result)
        }, e => {
            console.log(e)
        })
    }
    useEffect(fetch_data, [])
    var message = "this field can not be changed"
    var blog_comment_sample = {
        "id": 1,
        "username": "root",
        "blog_id": 1,
        "title": "title 22",
        "text": "text 22",
        "time": "1663546220534",
        "verification_status": "true",
        "verifier_username": "hamedpro"
    }
    function verify_blog_comment(blog_id) {
        var params = {
            task_name: "verify_blog_comment",
            verifier_username: window.localStorage.getItem('username'),
            blog_comment_id : blog_id
        }
        customAjax({
            params
        }).then(data => {
            alert('done successfuly')
            fetch_data()
        }, e => {
            alert('something went wrong')
            console.log(e)
        })
    }
    return (
        <>
            {blog_comments === null ? (
                <Loading />
            ) : (
                    <CustomTable
                        headerItems={Object.keys(blog_comment_sample)}
                        rows={blog_comments.map((comment, index) => {
                            return Object.keys(blog_comment_sample).map(key => {
                                return {
                                    value: comment[key],
                                    onClick: key == "verification_status" ? () => {
                                        verify_blog_comment(Number(comment.id))
                                    } : () => {
                                        alert(message)
                                    }
                                }
                            })
                    })}
                    />      
            )}
        </>
    )
}