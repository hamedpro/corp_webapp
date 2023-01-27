import json 
tmp = {}
with open('.env','r') as f :
    for line in f.readlines():
        line = line.strip()

        if(line == "") :
            continue
        if(line.endswith('')):
            line.replace("\n", "")
        key = line.split('=')[0]
        value = line.split('=')[1]
        if(value.isdigit()):
            value = int(value)
        tmp[key] = value
json.dump(tmp,open('/Users/hamedpro/w/corp_webapp/env.json',"w"))