// global access variable
let fetchData = [];

// fetch loading details for cards 
const URL = 'https://openapi.programming-hero.com/api/ai/tools';
const loadCardDetails = async (URL) => {
    // start spinner 
    toggleSpinner(true);

    const res = await fetch(URL);
    const data = await res.json();
    fetchData = data.data.tools.slice(0, 6);
    showCardDetails(data.data.tools.slice(0, 6), fetchData);
    // console.log(fetchData);
};

// show details for card
const showCardDetails = (data) => {
    // console.log(data);
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    // data = data.slice(0, 6)
    data.forEach(datum => {
        // console.log(datum);
        const { image, name, published_in, features, id } = datum;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card w-full h-full bg-base-100 shadow-xl p-5">
                <figure class="h-full"><img src=${image} /></figure>
                <div class="card-body">
                    <h2 class="text-2xl font-semibold">Features</h2>
                    <ol class="list-decimal">
                        <li>${features[0]}</li>
                        <li>${features[1]}</li>
                        <li>${features[2]}</li>
                    </ol>
                    <div class="my-6 border-2 border-gray-300"></div>
                    <div class="flex items-center justify-between">
                        <div>
                            <h2 class="text-2xl font-semibold">${name}</h2>
                            <div>&#128197; <span>${published_in}</span></div>
                        </div>
                        <!-- The button to open modal -->
                        <label onclick="loadDetailsOnModal('${id}')" for="modal-card-details" class="btn btn-circle bg-red-50 text-red-600 text-2xl btn-outline">&#x2192;</label>
                    </div>
                </div>
            </div>
        `;
        cardContainer.appendChild(div);
    });
    // stop spinner 
    toggleSpinner(false);
};


// see more button function
const seeMoreData = async () => {
    // start spinner 
    toggleSpinner(true);

    const URL = 'https://openapi.programming-hero.com/api/ai/tools';
    const res = await fetch(URL);
    const data = await res.json();
    fetchData = data.data.tools;
    showCardDetails(data.data.tools, fetchData);
};

// see more button clicked
document.getElementById('btn-see-more').addEventListener('click', function () {
    seeMoreData()
    document.getElementById('btn-see-more').classList.add("hidden");
});

// function for load details on modal
const loadDetailsOnModal = async (id) => {
    const URL = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
    const res = await fetch(URL);
    const data = await res.json();
    showDetailsOnModal(data.data);
};

const showDetailsOnModal = (data) => {
    // console.log(data);
    const { description, pricing, features, integrations, image_link, input_output_examples, accuracy } = data;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <label for="modal-card-details" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <div class="flex flex-col-reverse md:flex-row gap-5">
                        <!-- left -->
                        <div class="md:w-[50%] bg-red-50 p-5 border-2 border-red-300 rounded-xl">
                            <h2 class="text-2xl font-semibold">${description}</h2>
                            <div class="flex flex-wrap lg:flex-nowrap justify-around gap-5 my-6">
                                <div class="bg-white rounded-lg p-4 text-green-500 font-extrabold text-center w-full">${pricing ? pricing[0].price : 'Free of cost'} ${pricing ? pricing[0].plan : ''}</div>
                                <div class="bg-white rounded-lg p-4 text-yellow-500 font-extrabold text-center w-full">${pricing ? pricing[1].price : 'Free of cost'} ${pricing ? pricing[1].plan : ''}</div>
                                <div class="bg-white rounded-lg p-4 text-red-500 font-extrabold text-center w-full">${pricing ? pricing[2].price : 'Free of cost'} ${pricing ? pricing[2].plan : ''}</div>
                            </div>
                            <div class="flex justify-around">
                                <div>
                                    <h2 class="text-2xl font-semibold mb-4">Features</h2>
                                    <ul class="list-disc">
                                        <li>${features['1'].feature_name}</li>
                                        <li>${features['2'].feature_name}</li>
                                        <li>${features['3'].feature_name}</li>
                                    </ul>
                                </div>
                                <div>
                                    <h2 class="text-2xl font-semibold mb-4">Integrations</h2>
                                    <ul class="list-disc">
                                        <li>${integrations ? (integrations[0] ? integrations[0] : 'No Data Found') : 'No Data Found'}</li>
                                        <li>${integrations ? (integrations[1] ? integrations[1] : 'No Data Found') : 'No Data Found'}</li>
                                        <li>${integrations ? (integrations[2] ? integrations[2] : 'No Data Found') : 'No Data Found'}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <!-- right  -->
                        <div class="md:w-[50%] p-5 border-2 border-gray-300 rounded-xl">
                            <div class="static">
                                <img src=${image_link[0]}>
                                <button id="btn-accuracy"
                                class="text-white font-semibold bg-red-500 px-2 rounded-xl absolute top-12 right-12">${accuracy.score ? accuracy.score * 100 + `% accuracy` : ''}</button>
                            </div>
                            <h2 class="text-2xl font-semibold text-center mt-6 mb-4">${input_output_examples ? input_output_examples[0].input : 'Can you give any example?'}</h2>
                            <h2 class="text-center">${input_output_examples ? input_output_examples[0].output : 'No! Not Yet! Take a break!!!'}</h2>
                        </div>
                    </div>
    `;
};

// loading spinner function 
const toggleSpinner = isLoading => {
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('hidden');
    } else {
        loader.classList.add('hidden');
    }
};


// btn sortByDate clicked
const btnSort = () => {

    customSort = (a, b) => {
        const dateA = new Date(a.published_in);
        const dateB = new Date(b.published_in);
        if (dateA < dateB) return 1;
        else if (dateA > dateB) return -1;
        return 0;
    }

    fetchData = fetchData.sort(customSort);
    showCardDetails(fetchData);
};