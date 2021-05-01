# decode

Given a book:
- picks an sample
- generates a dictionary (mapping between letter and ciphered letter)
- encodes the sample using dictionary
- analyses the entire book to get language probabilities (if current letter is X, what is the probability that next is Y)
- tries to find (from scratch) a dictionary to decode the encoded sample, using pseudo-genetic algorithm (pool of dictionaries with incremental swapping)
- result is the decoded sample

```
➜  decode git:(master) node app.js
raw text =  the dormouse very ill alice tried to fancy to herself what such an extraordinar[...] 1.3%
dict =  ,m,d,r,h,k,z,u,x,a,n,e,j,w,g,f,s,v,t,c,i,y,b,q,p,l,o
encoded text = ocuhorgvjgithoyhvpoxeeo exdhocvxhrocgok wdpocgouhvthekobu cotiduo wohqcv gvrxw v[...]
Gen 0 best chromosome f,h,k,p,y,n,d,z,o,m,v,r,j,c,e,a,i,s,l,q,t, ,u,b,w,x,g => ektzesd mdoqzewz aebyyegybpzek bzsekdevgupaekdetz qzyvehtgkeqopteguezik gd sbug [...] score = 0.067 vs perfect 0.172
Gen 1 best chromosome f,h,k,p,y,n,d,z,o,m,v,r,t,c,e,a,i,s,l,q,j, ,u,b,w,x,g => ekjzesd mdoqzewz aebyyegybpzek bzsekdevgupaekdejz qzyvehjgkeqopjeguezik gd sbug [...] score = 0.069 vs perfect 0.172
Gen 3 best chromosome m,q,l,c,t,j,r,v,d,f,b,s,i,z,e,y,k,n,u,p,x,g,o,w,a, ,h => elxvenrgfrdpveavgyewttehtwcvelgwvnelrebhocyelrexvgpvtbeqxhlepdcxehoevklghrgnwohg[...] score = 0.081 vs perfect 0.172
Gen 4 best chromosome m,q,r,c,t,j,l,v,d,f,b,s,i,z,e,y,k,n,u,p,x,g,o,w,a, ,h => erxvenlgfldpveavgyewttehtwcvergwvnerlebhocyerlexvgpvtbeqxhrepdcxehoevkrghlgnwohg[...] score = 0.084 vs perfect 0.172
Gen 9 best chromosome m,q,r,c,t,j,l,v,d,f,b,s,i,z,e,y,k,n,u,p,h,g,o,w,a, ,x => erhvenlgfldpveavgyewttextwcvergwvnerlebxocyerlehvgpvtbeqhxrepdchexoevkrgxlgnwoxg[...] score = 0.085 vs perfect 0.172
Gen 19 best chromosome m,q,r,c,t,j,l,v,a,f,b,s,i,z,e,y,k,n,u,p,h,g,o,w,d, ,x => erhvenlgflapvedvgyewttextwcvergwvnerlebxocyerlehvgpvtbeqhxrepachexoevkrgxlgnwoxg[...] score = 0.085 vs perfect 0.172
Gen 20 best chromosome m,q,r,c,t,j,l,v,a,f,b,s,i,n,e,y,k,z,u,p,h,g,o,w,d, ,x => erhvezlgflapvedvgyewttextwcvergwvzerlebxocyerlehvgpvtbeqhxrepachexoevkrgxlgzwoxg[...] score = 0.091 vs perfect 0.172
Gen 21 best chromosome m,q,r,c,t,j,l,v,a,f,b,s,i,n,e,k,y,z,u,p,h,g,o,w,d, ,x => erhvezlgflapvedvgkewttextwcvergwvzerlebxockerlehvgpvtbeqhxrepachexoevyrgxlgzwoxg[...] score = 0.095 vs perfect 0.172
Gen 22 best chromosome m,q,r,c,t,j,l,v,a,f,b,s,i,n,e,k,x,z,u,p,h,g,o,w,d, ,y => erhvezlgflapvedvgkewtteytwcvergwvzerlebyockerlehvgpvtbeqhyrepacheyoevxrgylgzwoyg[...] score = 0.097 vs perfect 0.172
Gen 27 best chromosome m,q,r,c,t,j,b,v,a,f,l,s,i,n,e,k,x,z,u,p,h,g,o,w,d, ,y => erhvezbgfbapvedvgkewtteytwcvergwvzerbelyockerbehvgpvtleqhyrepacheyoevxrgybgzwoyg[...] score = 0.097 vs perfect 0.172
Gen 28 best chromosome m,q,r,c,t,j,b,v,a,f,l,s,g,n,e,k,x,z,u,p,h,i,o,w,d, ,y => erhvezbifbapvedvikewtteytwcveriwvzerbelyockerbehvipvtleqhyrepacheyoevxriybizwoyi[...] score = 0.100 vs perfect 0.172
Gen 30 best chromosome m,q,r,c,t,j,h,v,a,f,l,s,g,n,e,k,x,z,u,p,b,i,o,w,d, ,y => erbvezhifhapvedvikewtteytwcveriwvzerhelyockerhebvipvtleqbyrepacbeyoevxriyhizwoyi[...] score = 0.102 vs perfect 0.172
Gen 32 best chromosome m,q,r,c,t,j,h,v,a,f,l,u,g,n,e,k,x,z,s,p,b,i,o,w,d, ,y => erbvezhifhapvedvikewtteytwcveriwvzerhelyockerhebvipvtleqbyrepacbeyoevxriyhizwoyi[...] score = 0.103 vs perfect 0.172
Gen 45 best chromosome m,q,r,p,t,j,h,v,a,f,l,u,g,n,e,k,x,z,s,c,b,i,o,w,d, ,y => erbvezhifhacvedvikewtteytwpveriwvzerhelyopkerhebvicvtleqbyrecapbeyoevxriyhizwoyi[...] score = 0.104 vs perfect 0.172
Gen 46 best chromosome m,q,r,p,t,j,h,v,a,l,f,u,g,n,e,k,x,z,s,c,b,i,o,w,d, ,y => erbvezhilhacvedvikewtteytwpveriwvzerhefyopkerhebvicvtfeqbyrecapbeyoevxriyhizwoyi[...] score = 0.104 vs perfect 0.172
Gen 48 best chromosome m,p,r,q,t,j,h,v,a,l,f,u,g,n,e,k,x,z,s,c,b,i,o,w,d, ,y => erbvezhilhacvedvikewtteytwqveriwvzerhefyoqkerhebvicvtfepbyrecaqbeyoevxriyhizwoyi[...] score = 0.104 vs perfect 0.172
Gen 49 best chromosome m,p,r, ,t,j,h,v,a,l,f,u,g,n,e,k,x,z,s,c,b,i,o,w,d,q,y => erbvezhilhacvedvikewtteytw veriwvzerhefyo kerhebvicvtfepbyreca beyoevxriyhizwoyi[...] score = 0.107 vs perfect 0.172
Gen 50 best chromosome g,p,r, ,t,j,h,v,a,l,f,u,m,n,e,k,x,z,s,c,b,i,o,w,d,q,y => erbvezhilhacvedvikewtteytw veriwvzerhefyo kerhebvicvtfepbyreca beyoevxriyhizwoyi[...] score = 0.107 vs perfect 0.172
Gen 52 best chromosome g,p,r, ,t,j,h,v,a,l,f,u,m,n,e,k,x,z,q,c,b,i,o,w,d,s,y => erbvezhilhacvedvikewtteytw veriwvzerhefyo kerhebvicvtfepbyreca beyoevxriyhizwoyi[...] score = 0.108 vs perfect 0.172
Gen 53 best chromosome g,w,r, ,t,j,h,v,a,l,f,u,m,n,e,k,x,z,q,c,b,i,o,p,d,s,y => erbvezhilhacvedvikeptteytp veripvzerhefyo kerhebvicvtfewbyreca beyoevxriyhizpoyi[...] score = 0.109 vs perfect 0.172
Gen 61 best chromosome g,w,r, ,t,f,h,v,a,l,j,u,m,n,e,k,x,z,q,c,b,i,o,p,d,s,y => erbvezhilhacvedvikeptteytp veripvzerhejyo kerhebvicvtjewbyreca beyoevxriyhizpoyi[...] score = 0.110 vs perfect 0.172
Gen 68 best chromosome g,w,r, ,t,f,h,v,a,l,j,s,m,n,e,k,x,z,q,c,b,i,o,p,d,u,y => erbvezhilhacvedvikeptteytp veripvzerhejyo kerhebvicvtjewbyreca beyoevxriyhizpoyi[...] score = 0.110 vs perfect 0.172
Gen 71 best chromosome g,w,r, ,t,s,h,v,a,l,j,f,m,n,e,k,x,z,q,c,b,i,o,p,d,u,y => erbvezhilhacvedvikeptteytp veripvzerhejyo kerhebvicvtjewbyreca beyoevxriyhizpoyi[...] score = 0.111 vs perfect 0.172
Gen 78 best chromosome g,w,r, ,c,s,h,v,a,l,j,f,m,n,e,k,x,z,q,t,b,i,o,p,d,u,y => erbvezhilhatvedvikepcceycp veripvzerhejyo kerhebvitvcjewbyreta beyoevxriyhizpoyi[...] score = 0.111 vs perfect 0.172
Gen 80 best chromosome g,w,r, ,c,s,h,v,a,l,j,f,m,n,e,k,x,z,q,t,b,i,o,y,d,u,p => erbvezhilhatvedvikeyccepcy veriyvzerhejpo kerhebvitvcjewbpreta bepoevxriphizyopi[...] score = 0.112 vs perfect 0.172
Gen 89 best chromosome g,d,r, ,c,s,h,v,a,l,j,f,m,n,e,k,x,z,q,t,b,i,o,y,w,u,p => erbvezhilhatvewvikeyccepcy veriyvzerhejpo kerhebvitvcjedbpreta bepoevxriphizyopi[...] score = 0.113 vs perfect 0.172
Gen 100 best chromosome g,d,r, ,l,s,h,v,a,c,j,f,m,n,e,k,x,z,q,t,b,i,o,y,w,u,p => erbvezhichatvewvikeylleply veriyvzerhejpo kerhebvitvljedbpreta bepoevxriphizyopi[...] score = 0.116 vs perfect 0.172
Gen 110 best chromosome g,d,r, ,l,s,h,v,a,t,j,f,m,n,e,k,x,z,q,c,b,i,o,y,w,u,p => erbvezhithacvewvikeylleply veriyvzerhejpo kerhebvicvljedbpreca bepoevxriphizyopi[...] score = 0.117 vs perfect 0.172
Gen 125 best chromosome g,d,r, ,l,s,h,v,a,t,j,f,m,p,e,k,x,z,q,c,b,i,o,y,w,u,n => erbvezhithacvewvikeyllenly veriyvzerhejno kerhebvicvljedbnreca benoevxrinhizyoni[...] score = 0.117 vs perfect 0.172
Gen 141 best chromosome q,d,r, ,l,s,h,v,a,t,j,f,m,p,e,k,x,z,g,c,b,i,o,y,w,u,n => erbvezhithacvewvikeyllenly veriyvzerhejno kerhebvicvljedbnreca benoevxrinhizyoni[...] score = 0.117 vs perfect 0.172
Gen 154 best chromosome f,d,r, ,l,s,h,v,a,t,j,q,m,p,e,k,x,z,g,c,b,i,o,y,w,u,n => erbvezhithacvewvikeyllenly veriyvzerhejno kerhebvicvljedbnreca benoevxrinhizyoni[...] score = 0.117 vs perfect 0.172
Gen 170 best chromosome f,d,r, ,l,s,h,v,a,t,j,q,m,p,e,k,x,z,w,c,b,i,o,y,g,u,n => erbvezhithacvegvikeyllenly veriyvzerhejno kerhebvicvljedbnreca benoevxrinhizyoni[...] score = 0.117 vs perfect 0.172
Gen 209 best chromosome f,d,r, ,l,s,h,v,a,t,j,q,w,p,e,k,x,z,m,c,b,i,o,y,g,u,n => erbvezhithacvegvikeyllenly veriyvzerhejno kerhebvicvljedbnreca benoevxrinhizyoni[...] score = 0.117 vs perfect 0.172
Gen 219 best chromosome k,s,u,a,t,p,g,y,j,w,o,z,c,x, ,d,b,f,v,e,l,r,q,h,m,n,i =>  uly fgrwgjey myrd htt ithay urhyf ug oiqad ug lyreyto sliu ejal iq yburigrfhqir[...] score = 0.119 vs perfect 0.172
Gen 232 best chromosome k,s,u,a,t,p,g,y,j,w,r,z,c,x, ,d,b,f,v,e,l,o,q,h,m,n,i =>  uly fgowgjey myod htt ithay uohyf ug riqad ug lyoeytr sliu ejal iq ybuoigofhqio[...] score = 0.120 vs perfect 0.172
Gen 234 best chromosome f,d,r,b,l,s,h,v,a,t,j,q,w,p,e,k,x,z,m,c, ,i,o,y,g,u,n => er vezhithacvegvikeyllenlybveriyvzerhejnobkerhe vicvljed nrecab enoevxrinhizyoni[...] score = 0.123 vs perfect 0.172
Gen 242 best chromosome f,d,r,u,l,s,h,v,a,t,j,q,w,p,e,k,x,z,m,c, ,i,o,y,g,b,n => er vezhithacvegvikeyllenlyuveriyvzerhejnoukerhe vicvljed nrecau enoevxrinhizyoni[...] score = 0.124 vs perfect 0.172
Gen 256 best chromosome x,d,r,u,l,s,h,v,a,t,j,q,w,p,e,k,f,z,m,c, ,i,o,y,g,b,n => er vezhithacvegvikeyllenlyuveriyvzerhejnoukerhe vicvljed nrecau enoevfrinhizyoni[...] score = 0.124 vs perfect 0.172
Gen 266 best chromosome x,d,r,u,l,s,h,v,a,c,j,q,w,p,e,k,f,z,m,t, ,i,o,y,g,b,n => er vezhichatvegvikeyllenlyuveriyvzerhejnoukerhe vitvljed nretau enoevfrinhizyoni[...] score = 0.125 vs perfect 0.172
Gen 273 best chromosome x,d,r,u,l,s,h,v,a,c,j,q,w,p,e,k,f,z,m,t,n,i,o,y,g,b,  => ernvezhichatvegvikeylle lyuveriyvzerhej oukerhenvitvljedn retaune oevfri hizyo i[...] score = 0.125 vs perfect 0.172
Gen 283 best chromosome x,d,r,u,l,s,h,v,a,k,j,q,w,p,e,c,f,z,m,t,n,i,o,y,g,b,  => ernvezhikhatvegviceylle lyuveriyvzerhej oucerhenvitvljedn retaune oevfri hizyo i[...] score = 0.126 vs perfect 0.172
Gen 292 best chromosome x,d,r,u,l,s,h,v,a,k,j,q,w,p,e,c,f,z,m,t,g,i,o,y,n,b,  => ergvezhikhatvenviceylle lyuveriyvzerhej oucerhegvitvljedg retauge oevfri hizyo i[...] score = 0.127 vs perfect 0.172
Gen 303 best chromosome x,g,r,u,l,s,h,v,a,k,j,q,w,p,e,c,f,z,m,t,d,i,o,y,n,b,  => erdvezhikhatvenviceylle lyuveriyvzerhej oucerhedvitvljegd retaude oevfri hizyo i[...] score = 0.128 vs perfect 0.172
Gen 313 best chromosome x,g,r,f,l,s,h,v,a,k,j,q,w,p,e,c,u,z,m,t,d,i,o,y,n,b,  => erdvezhikhatvenviceylle lyfveriyvzerhej ofcerhedvitvljegd retafde oevuri hizyo i[...] score = 0.129 vs perfect 0.172
Gen 323 best chromosome x,g,r,f,l,k,h,v,a,s,j,q,w,p,e,c,u,z,m,t,d,i,o,y,n,b,  => erdvezhishatvenviceylle lyfveriyvzerhej ofcerhedvitvljegd retafde oevuri hizyo i[...] score = 0.130 vs perfect 0.172
Gen 326 best chromosome x,n,r,f,l,k,h,v,a,s,j,q,w,p,e,c,u,z,m,t,d,i,o,y,g,b,  => erdvezhishatvegviceylle lyfveriyvzerhej ofcerhedvitvljend retafde oevuri hizyo i[...] score = 0.131 vs perfect 0.172
Gen 330 best chromosome x,n,r,f,l,k,h,v,a,s,c,q,w,p,e,j,u,z,m,t,d,i,o,y,g,b,  => erdvezhishatvegvijeylle lyfveriyvzerhec ofjerhedvitvlcend retafde oevuri hizyo i[...] score = 0.132 vs perfect 0.172
Gen 334 best chromosome x,z, ,i,o,c,q,h,u,a,m,f,l,g,e,k,y,v,w,s,t,j,d,r,p,b,n => e thevqjaqushephjkerooenorihe jrhve qemndike qethjshomeztn esuitendehy jnqjvrdnj[...] score = 0.137 vs perfect 0.172
Gen 345 best chromosome x,b, ,i,o,c,q,h,u,a,m,f,l,g,e,k,y,v,w,s,t,j,d,r,p,z,n => e thevqjaqushephjkerooenorihe jrhve qemndike qethjshomebtn esuitendehy jnqjvrdnj[...] score = 0.137 vs perfect 0.172
Gen 348 best chromosome g,k,t,v,d,s,q,e,u,f,z,o,x,b, ,w,y,l,p,c,h,r,n,i,j,m,a =>  the lqrfquce jerw idd adive triel tq zanvw tq hercedz khat cuvh an eytraqrlinar[...] score = 0.138 vs perfect 0.172
Gen 356 best chromosome x,c, ,i,o,b,q,h,u,a,m,f,l,g,e,z,y,v,w,s,t,j,d,r,p,k,n => e thevqjaqushephjzerooenorihe jrhve qemndize qethjshomectn esuitendehy jnqjvrdnj[...] score = 0.139 vs perfect 0.172
Gen 367 best chromosome g,k,t,v,d,s,q,e,u,f,z,w,x,b, ,o,y,l,p,c,h,r,n,i,j,m,a =>  the lqrfquce jero idd adive triel tq zanvo tq hercedz khat cuvh an eytraqrlinar[...] score = 0.139 vs perfect 0.172
Gen 379 best chromosome x,c, ,i,o,b,q,h,u,a,m,f,w,g,e,z,y,v,l,s,t,j,d,r,p,k,n => e thevqjaqushephjzerooenorihe jrhve qemndize qethjshomectn esuitendehy jnqjvrdnj[...] score = 0.139 vs perfect 0.172
Gen 380 best chromosome x,c, ,i,o,b,q,h,u,a,m,f,w,g,e,j,y,v,l,s,t,z,d,r,p,k,n => e thevqzaqushephzjerooenorihe zrhve qemndije qethzshomectn esuitendehy znqzvrdnz[...] score = 0.140 vs perfect 0.172
Gen 383 best chromosome x,c, ,i,o,b,q,h,u,a,m,l,w,g,e,j,y,v,f,s,t,z,d,r,p,k,n => e thevqzaqushephzjerooenorihe zrhve qemndije qethzshomectn esuitendehy znqzvrdnz[...] score = 0.140 vs perfect 0.172
Gen 391 best chromosome x,c, ,i,o,m,q,h,u,a,b,l,w,g,e,j,y,v,f,s,t,z,d,r,p,k,n => e thevqzaqushephzjerooenorihe zrhve qebndije qethzshobectn esuitendehy znqzvrdnz[...] score = 0.141 vs perfect 0.172
Gen 412 best chromosome g,k,t,v,d,x,q,e,u,f,w,z,b,s, ,o,l,y,p,c,h,r,n,i,j,m,a =>  the yqrfquce jero idd adive triey tq wanvo tq hercedw khat cuvh an eltraqryinar[...] score = 0.151 vs perfect 0.172
Gen 415 best chromosome g,k,t,v,c,x,q,e,u,f,w,z,b,s, ,o,l,y,p,d,h,r,n,i,j,m,a =>  the yqrfqude jero icc acive triey tq wanvo tq herdecw khat duvh an eltraqryinar[...] score = 0.151 vs perfect 0.172
Gen 417 best chromosome g,k,t,v,c,x,q,e,u,f,w,z,j,s, ,o,l,y,p,d,h,r,n,i,b,m,a =>  the yqrfqude bero icc acive triey tq wanvo tq herdecw khat duvh an eltraqryinar[...] score = 0.151 vs perfect 0.172
Gen 447 best chromosome g,c,t,v,k,x,q,e,u,f,w,z,j,s, ,o,l,y,p,d,h,r,n,i,b,m,a =>  the yqrfqude bero ikk akive triey tq wanvo tq herdekw chat duvh an eltraqryinar[...] score = 0.152 vs perfect 0.172
Gen 449 best chromosome g,c,t,v,k,x,q,e,u,f,l,z,j,s, ,o,w,y,p,d,h,r,n,i,b,m,a =>  the yqrfqude bero ikk akive triey tq lanvo tq herdekl chat duvh an ewtraqryinar[...] score = 0.153 vs perfect 0.172
Gen 461 best chromosome f,c,t,v,k,x,q,e,u,g,l,z,j,s, ,o,w,y,p,d,h,r,n,i,b,m,a =>  the yqrgqude bero ikk akive triey tq lanvo tq herdekl chat duvh an ewtraqryinar[...] score = 0.153 vs perfect 0.172
Gen 472 best chromosome f,c,t,v,k,x,q,e,u,g,l,z,j,d, ,o,w,y,p,s,h,r,n,i,b,m,a =>  the yqrgquse bero ikk akive triey tq lanvo tq hersekl chat suvh an ewtraqryinar[...] score = 0.154 vs perfect 0.172
Gen 550 best chromosome f,c,t,v,l,x,q,e,u,g,k,z,j,d, ,o,w,y,p,s,h,r,n,i,b,m,a =>  the yqrgquse bero ill alive triey tq kanvo tq herselk chat suvh an ewtraqryinar[...] score = 0.156 vs perfect 0.172
Gen 622 best chromosome f,c,t,v,l,p,q,e,u,g,k,z,j,d, ,o,w,y,x,s,h,r,n,i,b,m,a =>  the yqrgquse bero ill alive triey tq kanvo tq herselk chat suvh an ewtraqryinar[...] score = 0.156 vs perfect 0.172
Gen 649 best chromosome f,c,t,b,l,p,q,e,u,g,k,z,j,d, ,o,w,y,x,s,h,r,n,i,v,m,a =>  the yqrgquse vero ill alibe triey tq kanbo tq herselk chat subh an ewtraqryinar[...] score = 0.156 vs perfect 0.172
Gen 650 best chromosome f,c,t,b,l,p,q,e,u,w,k,z,j,d, ,o,g,y,x,s,h,r,n,i,v,m,a =>  the yqrwquse vero ill alibe triey tq kanbo tq herselk chat subh an egtraqryinar[...] score = 0.156 vs perfect 0.172
Gen 651 best chromosome o,c,t,b,l,p,q,e,u,w,k,z,j,d, ,f,g,y,x,s,h,r,n,i,v,m,a =>  the yqrwquse verf ill alibe triey tq kanbf tq herselk chat subh an egtraqryinar[...] score = 0.160 vs perfect 0.172
Gen 681 best chromosome o,b,t,c,l,p,q,e,u,w,k,z,j,d, ,f,g,y,x,s,h,r,n,i,v,m,a =>  the yqrwquse verf ill alice triey tq kancf tq herselk bhat such an egtraqryinar[...] score = 0.160 vs perfect 0.172
Gen 728 best chromosome o,g,t,c,l,p,q,e,u,w,k,z,j,d, ,f,b,y,x,s,h,r,n,i,v,m,a =>  the yqrwquse verf ill alice triey tq kancf tq herselk ghat such an ebtraqryinar[...] score = 0.161 vs perfect 0.172
Gen 731 best chromosome x,g,t,c,l,p,q,e,u,w,k,z,j,d, ,f,b,y,o,s,h,r,n,i,v,m,a =>  the yqrwquse verf ill alice triey tq kancf tq herselk ghat such an ebtraqryinar[...] score = 0.161 vs perfect 0.172
Gen 746 best chromosome x,g,t,c,l,p,q,e,u,w,k,z,j,m, ,f,b,y,o,s,h,r,n,i,v,d,a =>  the yqrwquse verf ill alice triey tq kancf tq herselk ghat such an ebtraqryinar[...] score = 0.163 vs perfect 0.172
Gen 792 best chromosome x,g,t,c,l,p,o,e,u,w,k,z,j,m, ,f,b,y,q,s,h,r,n,i,v,d,a =>  the yorwouse verf ill alice triey to kancf to herselk ghat such an ebtraoryinar[...] score = 0.165 vs perfect 0.172
Gen 844 best chromosome x,g,t,c,l,z,o,e,u,w,k,p,j,m, ,f,b,y,q,s,h,r,n,i,v,d,a =>  the yorwouse verf ill alice triey to kancf to herselk ghat such an ebtraoryinar[...] score = 0.165 vs perfect 0.172
Gen 946 best chromosome x,g,t,c,l,z,o,e,u,w,m,p,j,k, ,f,b,y,q,s,h,r,n,i,v,d,a =>  the yorwouse verf ill alice triey to mancf to herselm ghat such an ebtraoryinar[...] score = 0.165 vs perfect 0.172
Gen 1173 best chromosome b,g,t,c,l,z,o,e,u,w,m,p,j,k, ,f,x,y,q,s,h,r,n,i,v,d,a =>  the yorwouse verf ill alice triey to mancf to herselm ghat such an extraoryinar[...] score = 0.165 vs perfect 0.172
Gen 1339 best chromosome b,g,t,c,l,z,o,e,u,w,m,p,j,k, ,f,x,d,q,s,h,r,n,i,v,y,a =>  the dorwouse verf ill alice tried to mancf to herselm ghat such an extraordinar[...] score = 0.167 vs perfect 0.172
Gen 1447 best chromosome b,m,t,c,l,z,o,e,u,w,g,p,j,k, ,f,x,d,q,s,h,r,n,i,v,y,a =>  the dorwouse verf ill alice tried to gancf to herselg mhat such an extraordinar[...] score = 0.167 vs perfect 0.172
Gen 1531 best chromosome b,m,t,c,l,z,o,e,u,w,g,p,j,k, ,y,x,d,q,s,h,r,n,i,v,f,a =>  the dorwouse very ill alice tried to gancy to herselg mhat such an extraordinar[...] score = 0.170 vs perfect 0.172
Gen 1649 best chromosome b,w,t,c,l,z,o,e,u,m,g,p,j,k, ,y,x,d,q,s,h,r,n,i,v,f,a =>  the dormouse very ill alice tried to gancy to herselg what such an extraordinar[...] score = 0.171 vs perfect 0.172
Gen 1713 best chromosome b,w,t,c,l,z,o,e,u,m,f,p,j,k, ,y,x,d,q,s,h,r,n,i,v,g,a =>  the dormouse very ill alice tried to fancy to herself what such an extraordinar[...] score = 0.172 vs perfect 0.172
```