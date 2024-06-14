-- Window = {} -- create a namespace

-- -- create the prototype with default values
-- Window.prototype = {x=0, y=0, width=100, height=100}
-- Window.mt = {} --create a metatable

-- --declare the constructor function
-- function Window.new( o )
--   setmetatable(o, Window.mt)
-- 	return o
-- end

-- Window.mt.__index = function ( table, key )
-- 	return Window.prototype[key]
-- end

-- w = Window.new{x=10, y=20}


-- local res = fetch({
--     url = "https://api.ipify.org?format=json",
--     method="GET",
--     headers = { ["Content-Type"] = "application/json" }
-- })

local res = fetch({
    url = "https://api.ipify.org?format=json",
    method="GET",
    headers = { ["Content-Type"] = "application/json" }
    body = '{ "test": ' .. test .. '}'
})
print(res)
local main_div = get("maindiv")
main_div.set_contents(res.ip)