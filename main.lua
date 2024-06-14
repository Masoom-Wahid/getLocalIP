local res = fetch({
    url = "https://api.ipify.org?format=json",
    method="GET",
    headers = { ["Content-Type"] = "application/json" }
})
get("hello").set_content(res["ip"])