# -*- coding: utf-8 -*-

import json
import pandas as pd
import numpy as np
import jenkspy
import seaborn as sns
import sys
import argparse
import time

def cap(x):
    return x.capitalize()

f = open('c_data.json')
# returns JSON object as a dictionary
data = json.load(f)
df = pd.DataFrame(data)
ress = json.loads(sys.argv[1])
#series = pd.Series(ress)
#df = df.append(ress, ignore_index = True)
""" res= df.groupby('req').size()
my_df= pd.DataFrame([res.index,res],['req','req_count'])
my_df=my_df.T """

if (df['req'].apply(cap) == cap(ress['req'])).any():
    df.req_count[df['req'].apply(cap)==cap(ress['req'])]+=1
else:
    nl={'req':ress['req'], 'req_count':1}
    df = df.append(nl, ignore_index = True)

df.to_json(r'c_data.json')

breaks= jenkspy.jenks_breaks(df['req_count'],nb_class=2)
my_arr = df.to_numpy()
x = np.where(my_arr[:,1]> breaks[1],True,False)
df['anomalie_labels']=x

test = df[df["req"].apply(cap)==cap(ress["req"])]["anomalie_labels"]
result = test[0]
print(str(time.time())+":"+str(result))
f.close()
