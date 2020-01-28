//Buttons for all of the states
var va = document.getElementById('VA');
va.onclick = function(elem){
    if (currState == 'VA')
    {
        this.style['fill'] = getColor();
        
        stateVal++;
        
        answered.push('VA');
        
        count++;
        if (count < captSize)
        {
            delete capital['VA'];
            
        }
        displayCap();
    }
};

var ak = document.getElementById('AK');
ak.onclick = function(elem){
    if (currState == 'AK')
    {
        this.style['fill'] = getColor();
        answered.push('AK');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['AK'];
            
        }
        displayCap();
    }
};

var az = document.getElementById('AZ');
az.onclick = function(elem){
    if (currState == 'AZ')
    {
        this.style['fill'] = getColor();
        answered.push('AZ');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['AZ'];
            
        }
        displayCap();
    }
};

var al = document.getElementById('AL');
al.onclick = function(elem){
    if (currState == 'AL')
    {
        this.style['fill'] = getColor();
        answered.push('AL');
        stateVal++;
        count++;
        if (count < captSize)
        {
            delete capital['AL'];
            
        }
        displayCap();
    }
};

var ar = document.getElementById('AR');
ar.onclick = function(elem){
    if (currState == 'AR')
    {
        
        stateVal++;
        answered.push('AR');
        this.style['fill'] = getColor();
        count++;
        if (count < captSize)
        {
            delete capital['AR'];
            
        }
        displayCap();
    }
};

var ca = document.getElementById('CA');
ca.onclick = function(elem){
    if (currState == 'CA')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('CA');
        count++;
        if (count < captSize)
        {
            delete capital['CA'];
            
        }
        displayCap();
    }
};

var co = document.getElementById('CO');
co.onclick = function(elem){
    if (currState == 'CO')
    {
        this.style['fill'] = getColor();
        stateVal++;
        answered.push('CO');
        count++;
        if (count < captSize)
        {
            delete capital['CO'];
            
        }
        displayCap();
    }
};

var ct = document.getElementById('CT');
ct.onclick = function(elem){
    if (currState == 'CT')
    {
        this.style['fill'] = getColor();
        answered.push('CT');
        stateVal++;
        count++;
        if (count < captSize)
        {
            delete capital['CT'];
            
        }
        displayCap();
    }
};

var de = document.getElementById('DE');
de.onclick = function(elem){
    if (currState == 'DE')
    {
        this.style['fill'] = getColor();
        stateVal++;
        answered.push('DE');
        count++;
        if (count < captSize)
        {
            delete capital['DE'];
            
        }
        displayCap();
    }
};

var fl = document.getElementById('FL');
fl.onclick = function(elem){
    if (currState == 'FL')
    {
        this.style['fill'] = getColor();
        answered.push('FL');
        stateVal++;
        count++;
        if (count < captSize)
        {
            delete capital['FL'];
            
        }
        displayCap();
    }
};

var ga = document.getElementById('GA');
ga.onclick = function(elem){
    if (currState == 'GA')
    {
        this.style['fill'] = getColor();
        answered.push('GA');
        stateVal++;
        count++;
        if (count < captSize)
        {
            delete capital['GA'];
            
        }
        displayCap();
    }
};

var hi = document.getElementById('HI');
hi.onclick = function(elem){
    if (currState == 'HI')
    {
        this.style['fill'] = getColor();
        answered.push('HI');
        stateVal++;
        count++;
        if (count < captSize)
        {
            delete capital['HI'];
            
        }
        displayCap();
    }
};

var id = document.getElementById('ID');
id.onclick = function(elem){
    if (currState == 'ID')
    {
        this.style['fill'] = getColor();
        answered.push('ID');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['ID'];
            
        }
        displayCap();
    }
};

var il = document.getElementById('IL');
il.onclick = function(elem){
    if (currState == 'IL')
    {
        this.style['fill'] = getColor();
        answered.push('IL');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['IL'];
            
        }
        displayCap();
    }
};

var iN = document.getElementById('IN');
iN.onclick = function(elem){
    if (currState == 'IN')
    {
        this.style['fill'] = getColor();
        answered.push('IN');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['IN'];
            
        }
        displayCap();
    }
};

var ia = document.getElementById('IA');
ia.onclick = function(elem){
    if (currState == 'IA')
    {
        this.style['fill'] = getColor();
        answered.push('IA');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['IA'];
            
        }
        displayCap();
    }
};

var ks = document.getElementById('KS');
ks.onclick = function(elem){
    if (currState == 'KS')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('KS');
        stateVal++;
        if (count < captSize)
        {
            delete capital['KS'];
            
        }
        displayCap();
    }
};

var ky = document.getElementById('KY');
ky.onclick = function(elem){
    if (currState == 'KY')
    {
        this.style['fill'] = getColor();
        answered.push('KY');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['KY'];
            
        }
        displayCap();
    }
};

var la = document.getElementById('LA');
la.onclick = function(elem){
    if (currState == 'LA')
    {
        this.style['fill'] = getColor();
        answered.push('LA');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['LA'];
            
        }
        displayCap();
    }
};

var me = document.getElementById('ME');
me.onclick = function(elem){
    if (currState == 'ME')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('ME');
        stateVal++;
        if (count < captSize)
        {
            delete capital['ME'];
            
        }
        displayCap();
    }
};


var md = document.getElementById('MD');
md.onclick = function(elem){
    if (currState == 'MD')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('MD');
        stateVal++;
        if (count < captSize)
        {
            delete capital['MD'];
            
        }
        displayCap();
    }
};

var ma = document.getElementById('MA');
ma.onclick = function(elem){
    if (currState == 'MA')
    {
        this.style['fill'] = getColor();
        answered.push('MA');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['MA'];
            
        }
        displayCap();
    }
};

var mi = document.getElementById('MI');
mi.onclick = function(elem){
    if (currState == 'MI')
    {
        this.style['fill'] = getColor();
        answered.push('MI');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['MI'];
            
        }
        displayCap();
    }
};

var mn = document.getElementById('MN');
mn.onclick = function(elem){
    if (currState == 'MN')
    {
        this.style['fill'] = getColor();
        answered.push('MN');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['MN'];
            
        }
        displayCap();
    }
};

var mo = document.getElementById('MO');
mo.onclick = function(elem){
    if (currState == 'MO')
    {
        this.style['fill'] = getColor();
        count++;
        stateVal++;
        answered.push('MO');
        if (count < captSize)
        {
            delete capital['MO'];
            
        }
        displayCap();
    }
};

var ms = document.getElementById('MS');
ms.onclick = function(elem){
    if (currState == 'MS')
    {
        this.style['fill'] = getColor();
        count++;
        stateVal++;
        answered.push('MS');
        if (count < captSize)
        {
            delete capital['MS'];
            
        }
        displayCap();
    }
};

var mt = document.getElementById('MT');
mt.onclick = function(elem){
    if (currState == 'MT')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('MT');
        stateVal++;
        if (count < captSize)
        {
            delete capital['MT'];
            
        }
        displayCap();
    }
};

var ne = document.getElementById('NE');
ne.onclick = function(elem){
    if (currState == 'NE')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('NE');
        stateVal++;
        if (count < captSize)
        {
            delete capital['NE'];
            
        }
        displayCap();
    }
};

var nd = document.getElementById('ND');
nd.onclick = function(elem){
    if (currState == 'ND')
    {
        this.style['fill'] = getColor();
        answered.push('ND');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['ND'];
            
        }
        displayCap();
    }
};

var nh = document.getElementById('NH');
nh.onclick = function(elem){
    if (currState == 'NH')
    {
        this.style['fill'] = getColor();
        answered.push('NH');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['NH'];
            
        }
        displayCap();
    }
};

var nj = document.getElementById('NJ');
nj.onclick = function(elem){
    if (currState == 'NJ')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('NJ');
        stateVal++;
        if (count < captSize)
        {
            delete capital['NJ'];
            
        }
        displayCap();
    }
};

var nm = document.getElementById('NM');
nm.onclick = function(elem){
    if (currState == 'NM')
    {
        this.style['fill'] = getColor();
        answered.push('NM');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['NM'];
            
        }
        displayCap();
    }
};

var ny = document.getElementById('NY');
ny.onclick = function(elem){
    if (currState == 'NY')
    {
        this.style['fill'] = getColor();
        answered.push('NY');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['NY'];
            
        }
        displayCap();
    }
};

var nc = document.getElementById('NC');
nc.onclick = function(elem){
    if (currState == 'NC')
    {
        this.style['fill'] = getColor();
        answered.push('NC');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['NC'];
            
        }
        displayCap();
    }
};

var nd = document.getElementById('ND');
nd.onclick = function(elem){
    if (currState == 'ND')
    {
        this.style['fill'] = getColor();
        answered.push('ND');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['ND'];
            
        }
        displayCap();
    }
};

var oh = document.getElementById('OH');
oh.onclick = function(elem){
    if (currState == 'OH')
    {
        this.style['fill'] = getColor();
        count++;
        answered.push('OH');
        stateVal++;
        if (count < captSize)
        {
            delete capital['OH'];
            
        }
        displayCap();
    }
};

var ok = document.getElementById('OK');
ok.onclick = function(elem){
    if (currState == 'OK')
    {
        this.style['fill'] = getColor();
        answered.push('OK');
        count++;
        stateVal++;
        if (count < captSize)
        {
            delete capital['OK'];
            
        }
        displayCap();
    }
};

var or = document.getElementById('OR');
or.onclick = function(elem){
    if (currState == 'OR')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('OR');
        count++;
        if (count < captSize)
        {
            delete capital['OR'];
            
        }
        displayCap();
    }
};

var pa = document.getElementById('PA');
pa.onclick = function(elem){
    if (currState == 'PA')
    {
        stateVal++;
        this.style['fill'] = getColor();
        count++;
        answered.push('PA');
        if (count < captSize)
        {
            delete capital['PA'];
            
        }
        displayCap();
    }
};

var ri = document.getElementById('RI');
ri.onclick = function(elem){
    if (currState == 'RI')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('RI');
        count++;
        if (count < captSize)
        {
            delete capital['RI'];
            
        }
        displayCap();
    }
};

var sc = document.getElementById('SC');
sc.onclick = function(elem){
    if (currState == 'SC')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('SC');
        count++;
        if (count < captSize)
        {
            delete capital['SC'];
            
        }
        displayCap();
    }
};

var sd = document.getElementById('SD');
sd.onclick = function(elem){
    if (currState == 'SD')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('SD');
        count++;
        if (count < captSize)
        {
            delete capital['SD'];
            
        }
        displayCap();
    }
};

var tn = document.getElementById('TN');
tn.onclick = function(elem){
    if (currState == 'TN')
    {
        stateVal++;
        answered.push('TN');
        this.style['fill'] = getColor();
        count++;
        if (count < captSize)
        {
            delete capital['TN'];
            
        }
        displayCap();
    }
};

var tx = document.getElementById('TX');
tx.onclick = function(elem){
    if (currState == 'TX')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('TX');
        count++;
        if (count < captSize)
        {
            delete capital['TX'];
            
        }
        displayCap();
    }
};

var ut = document.getElementById('UT');
ut.onclick = function(elem){
    if (currState == 'UT')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('UT');
        count++;
        if (count < captSize)
        {
            delete capital['UT'];
            
        }
        displayCap();
    }
};

var vt = document.getElementById('VT');
vt.onclick = function(elem){
    if (currState == 'VT')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('VT');
        count++;
        if (count < captSize)
        {
            delete capital['VT'];
            
        }
        displayCap();
    }
};

var wa = document.getElementById('WA');
wa.onclick = function(elem){
    if (currState == 'WA')
    {
        stateVal++;
        this.style['fill'] = getColor();
        answered.push('WA');
        count++;
        if (count < captSize)
        {
            delete capital['WA'];
            
        }
        displayCap();
    }
};

var wv = document.getElementById('WV');
wv.onclick = function(elem){
    if (currState == 'WV')
    {
        stateVal++;
        answered.push('WV');
        this.style['fill'] = getColor();
        count++;
        if (count < captSize)
        {
            delete capital['WV'];
            
        }
        displayCap();
    }
};

var wi = document.getElementById('WI');
wi.onclick = function(elem){
    if (currState == 'WI')
    {
        stateVal++;
        answered.push('WI');
        this.style['fill'] = getColor();
        count++;
        if (count < captSize)
        {
            delete capital['WI'];
            
        }
        displayCap();
    }
};

var wy = document.getElementById('WY');
wy.onclick = function(elem){
    if (currState == 'WY')
    {
        stateVal++;
        this.style['fill'] = getColor();
        count++;
        answered.push('WY');
        if (count < captSize)
        {
            delete capital['WY'];
            
        }
        displayCap();
    }
};

var nv = document.getElementById('NV');
nv.onclick = function(elem){
    if (currState == 'NV')
    {
        stateVal++;
        answered.push('NV');
        this.style['fill'] = getColor();
        count++;
        if (count < captSize)
        {
            delete capital['NV'];
            
        }
        displayCap();
    }
};
