
function generatecontent(val)
{

    document.querySelector('.row').innerHTML = ``;
    fetch(`https://api.nytimes.com/svc/topstories/v2/${val}.json?api-key=oTNHRXQ6uWFV5m9c3YIrpxJYOdEKvjh6`).then(res=>res.json()).then(data=>{
        data.results.forEach(v=>{
            let parent = document.createElement('div');
            document.querySelector('.row').appendChild(parent);
            parent.className = 'parent col-sm-12 col-lg-12 col-xl-6 mt-3 align-items-center bg-info';
            let thumbnail = document.createElement('img');
            parent.appendChild(thumbnail);
            let card = document.createElement('div');
            parent.appendChild(card);
            let card_body = document.createElement('div');
            card.appendChild(card_body);
            let card_title = document.createElement('h4');
            card_body.appendChild(card_title);
            let card_subtitle = document.createElement('h5');
            card_body.appendChild(card_subtitle);
            card_text    = document.createElement('ul');
            card_body.appendChild(card_text);
            card_link   = document.createElement('a');
            card_body.appendChild(card_link);
            parent.setAttribute('data-value',data.results.indexOf(v));
            card.className = 'col-md-7 card h-100 bg-info';
            card_body.className = 'card-body';
            card_title.className = 'card-title';
            card_title.textContent = v.title;
            card_subtitle.className = 'card-subtitle text-muted';
            card_subtitle.textContent = v.created_date.split('').slice(0,10).join('');
            card_text.className = 'card-text text-monospace text-wrap list-unstyled';
            card_text.innerHTML =
            `<li>Abstract : ${v.abstract}</li>
            <li>Byline : ${v.byline}</li>
            <li>Section : ${v.section}</li>
            <li>Item-Type : ${v.item_type}</li>
            `
            card_link.className = 'card-link bg-dark';
            card_link.href = v.url;
            card_link.target = '_blank'
            card_link.textContent = `View full article`
            thumbnail.className = ' col-md-5 img-thumbnail float-right mt-5  h-75 w-100 align-self-center bg-info';
            thumbnail.src = v.multimedia[1].url;
            let query = window.matchMedia("(max-width: 800px)");
            query.addListener(change);
            function change(query)
            {
                
                if(query.matches)
                {
                    parent.innerHTML = ``;
                    let card = document.createElement('div');
                    parent.appendChild(card);
                    let thumbnail = document.createElement('img');
                    card.appendChild(thumbnail);
                    let card_body = document.createElement('div');
                    card.appendChild(card_body);
                    let card_title = document.createElement('h4');
                    card_body.appendChild(card_title);
                    let card_subtitle = document.createElement('h5');
                    card_body.appendChild(card_subtitle);
                    card_text    = document.createElement('ul');
                    card_body.appendChild(card_text);
                    card_link   = document.createElement('a');
                    card_body.appendChild(card_link);
                    thumbnail.className = 'card-img-top img-responsive';
                    thumbnail.src = v.multimedia[1].url;                            
                    card.className = 'card';
                    card_body.className = 'card-body';
                    card_title.className = 'card-title';
                    card_title.textContent = v.title;
                    card_subtitle.className = 'card-subtitle text-muted';
                    card_subtitle.textContent = v.created_date.split('').slice(0,10).join('');
                    card_text.className = 'card-text text-monospace text-wrap list-unstyled';
                    card_text.innerHTML =
                    `<li>Abstract : ${v.abstract}</li>
                    <li>Byline : ${v.byline}</li>
                    <li>Section : ${v.section}</li>
                    <li>Item-Type : ${v.item_type}</li>
                    `
                    card_link.className = 'card-link';
                    card_link.href = v.url;
                    card_link.target = '_blank'
                    card_link.textContent = `View full article`;
                    document.querySelectorAll('.nav-item').forEach(l=>{
                        l.classList.remove('mx-2');
                        l.firstChild.classList.remove('btn-lg');
                        l.firstChild.classList.add('btn-sm');

                    })
                }
                else generatecontent(val);
               
            }

        })
    })
}
let val = 'home';
generatecontent(val);
document.querySelector('.nav').addEventListener('click',event=>{  
    document.querySelector('.'+val).classList.remove('active');
    event.target.className += ' active';
    if(event.target.value != undefined)
    {
        val = event.target.value;
        generatecontent(val);
    }  
})