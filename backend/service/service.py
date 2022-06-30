from sanic import Sanic
from sanic.response import text ,json
from dotenv import load_dotenv
import os
from models.GetCorrelation import GetCorrelation as GetCorrelationModel

load_dotenv()
port = os.getenv('SERVICE_PORT')
app = Sanic("DecidoRecommendService")

@app.get("/")
async def hello_world(request):
    return text("Hello, Decido Service.")
@app.get("/correlation")
async def GetCorrelation(request):
    args = request.args
    lng = float(args.get('lng',121.5374623))
    lat = float(args.get('lat',25.0351811))
    tag = args.get('tag',{'$ne':''})
    seed = args.get('seed','')
    getCorrelation = GetCorrelationModel(seed,[lng,lat],tag)
    data = getCorrelation.CalcCorrelation()
    return json(data)

app.run(host='0.0.0.0', port=port, access_log=True)