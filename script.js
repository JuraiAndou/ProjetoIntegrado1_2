var inst = [];
var list_bairro = []
$.get("data.json",
    function (data) {
        /**transforma o arquivo .json em um array */
        for(let i = 0; i < data.length; i++){
            inst.push(data[i]);
        }
        
        /**organiza o array de instituicoes numa lista por bairros
         * Teste de cada instituicao pra ver se ja existe uma lista pro seu bairro
         * Caso haja ela e adicionada nessa lista, senao e criada uma nova lista
         */
        let match = false; //var para o controle de checagem
        let matchNum = null;
        for(let i = 0; i < inst.length; i++){
            for (let j = 0; j < list_bairro.length; j++) {
                if (list_bairro[j].bairro == inst[i].bairro) {
                    match = true;
                    matchNum = j;
                    break;
                }
            }
            if(match){
                match = false;
                list_bairro[matchNum].list.push(inst[i]);
            }else{
                /**ESTRUTURA
                 * [{
                 *      bairro : "nome do bairro",
                 *      list : [
                 *          {instituicao 01},
                 *          {instituicao 02},
                 *          etc...
                 *      ]
                 * },
                 * {
                 *    bairro : "nome do outro bairro",
                 *      list : [
                 *          {instituicao 01},
                 *          {instituicao 02},
                 *          etc...
                 *},
                 *
                 * etc...
                 *        
                 *}]
                 */
                list_bairro.push({bairro : inst[i].bairro, list : [inst[i]]});
            }
        }
        
        for (let i = 0; i < list_bairro.length; i++) {
            const element = list_bairro[i];

            let list_inst = "";
            for (let j = 0; j < element.list.length; j++) {
                list_inst += 
                "<div class=\"local-ref\">"+
                    "<div class=\"local-ref-title\">"+ element.list[j].nome +"</div>"+
                    "<div class=\"local-ref-info\"></div>"+
                    "<div class=\"local-ref-map\"></div>"+
                "</div>";
            }
            
            $('#bairro-list').append(
                "<div class=\"bairro-block\">"+
                    "<div class=\"bairro-header\">"+
                        "<div class=\"bairro-icon\"></div>"+
                        "<div class=\"bairro-title\">"+ element.bairro +"</div>"+
                        "<div class=\"bairro-arrow-button\"></div>"+
                    "</div>"+
                
                   " <div class=\"bairro-locais-list\">"+
                   list_inst+
                    "</div>"+
			    "</div>"
            );
            
        }
        AddClickEvent();
    }
);

function AddClickEvent() {
    $(".bairro-header").each(function(){
        $(this).on("click", toggleBairroList);
    });

    $(".local-ref-info").each(function(){
        $(this).on("click", openLocalInfo);
    });
    
    $("#close-local-block").on("click", closeLocalInfo);

    $("#filter-button").on("click", openFilterTab);
    $("#close-filter-tab").on("click", closeFilterTab);
}

function toggleBairroList(){
    if ($(this).hasClass("bairro-header-selected") == false) {
        var oldOpenBairro = $(".bairro-header-selected");
        oldOpenBairro.attr("open", "false");
        oldOpenBairro.next(".bairro-locais-list").css("display", "none");
        oldOpenBairro.removeClass("bairro-header-selected");

        $(this).attr("open", "true");
        $(this).addClass("bairro-header-selected");
    
        var list = $(this).next(".bairro-locais-list"); 
        list.css("display", "flex");
    }
    else {
        $(this).attr("open", "false");
        $(this).removeClass("bairro-header-selected");
    
        var list = $(this).next(".bairro-locais-list"); 
        list.css("display", "none");
    }
}

// Open Filter Tab
function openFilterTab() {
    var filterTabBg = $("#filter-tab-bg")
    var filterTab = $("#filter-tab");

    filterTabBg.css("display", "block");
    filterTabBg.css("animation-name", "showBg");
    filterTab.css("animation-name", "openFilterTab");
};

// Close Filter Tab
function closeFilterTab() {
    var filterTabBg = $("#filter-tab-bg")
    var filterTab = $("#filter-tab");
    
    filterTabBg.css("animation-name", "hideBg");
    filterTab.css("animation-name", "closeFilterTab");
    setTimeout(function(){ filterTabBg.css("display", "none"); }, 500);
};

function openLocalInfo() {
    var localInfoBg = $("#local-block-bg")
    var localInfo = $("#local-block");

    localInfoBg.css("display", "block") ;
    localInfoBg.css("animation-name","showBg") ;
    localInfo.css("animation-name","openLocalInfo");
}

function closeLocalInfo() {
    var localInfoBg = $("#local-block-bg")
    var localInfo = $("#local-block");

    localInfoBg.css("animation-name","hideBg") ;
    localInfo.css("animation-name","closeLocalInfo");
    setTimeout(function(){ localInfoBg.css("display", "none"); }, 500);
}