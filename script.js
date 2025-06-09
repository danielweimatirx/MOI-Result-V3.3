// JavaScript code will go here 

// Global state variables
let currentPage = 'parsingDetails'; // 'parsingDetails' or 'smartSearch'

// --- State for DocumentParsingDetails ---
let displayFilter = 'all'; // 'all', 'text', 'image'
let highlightedBlockId = null;
let hoveredOriginalArea = null;
let hoveredBlockPreview = null;
let mouseCoords = { x: 0, y: 0 };
let showConfirmModalState = false;
let blockToDeleteId = null;
let showDetailViewModalState = false;
let detailViewContent = { content: '', type: '' };
let searchTextQuery = '';
let originalFileCurrentPage = 1;
const originalFileTotalPages = 5; // Assuming 5 pages for the mock document
let parsedBlocksCurrentPage = 1;
let blocksPerPage = 5;
let expandedBlockId = null;
const APPROX_LINE_CHAR_LIMIT = 180;

// Mock data for parsed blocks
let parsedBlocks = [
   
    { id: 'text_info_title', type: 'title', content: '论文题目: 基于语音辅助的多语言文本分类语言偏见去偏研究方佳俊', disabled: false, area: { top: '29%', left: '15%', width: '70%', height: '5%' }, isExpanded: false, page: 1, confidence: 0.95 },
    { id: 'text_info_author', type: 'catlog', content: `论文作者: 方佳俊 指导教师 阳爱民\\n\\n该作者在多语言文本分类领域进行了深入研究，尤其关注如何消除语言偏见对模型性能的影响。他的研究旨在开发创新的语音辅助去偏技术，以提高跨语言文本分类的公平性和准确性。\\n\\n研究内容涵盖了以下几个方面：\\n1. 多语言数据集的构建与偏见分析。\\n2. 基于语音特征的语言偏见识别方法。\\n3. 深度学习模型在去偏任务中的应用。\\n4. 评估去偏效果的指标与方法。\\n5. 实际应用场景中的案例分析与效果验证。\\n\\n方佳俊同学的这项工作对于推动多语言自然语言处理技术的发展，以及构建更公平、更具包容性的人工智能系统具有重要意义。他的研究成果不仅填补了相关领域的空白，也为未来的研究提供了宝贵的思路和方向。\\n\\n在研究过程中，他积极参与学术交流，多次在国内外顶级会议上发表论文，并与多个研究机构建立了合作关系。这些经历进一步丰富了他的学术视野和实践能力。\\n\\n为了充分展示该研究的深度和广度，我们在此增加更多详细信息。研究团队在数据预处理阶段投入了大量精力，确保了训练数据的多样性和代表性。他们采用了先进的自然语言处理技术，对不同语言的文本数据进行了细致的特征提取和表示学习。在模型设计方面，研究人员探索了多种神经网络架构，包括循环神经网络（RNN）、长短期记忆网络（LSTM）和Transformer等，并针对语音辅助去偏的特点进行了创新性改进。\\n\\n实验结果表明，所提出的语音辅助去偏方法在多个公开数据集上均取得了显著的性能提升，有效降低了语言偏见对文本分类结果的影响。这些成果为构建更加鲁棒和公平的AI系统提供了坚实的基础。未来的工作将侧重于将该技术应用于更广泛的领域，例如情感分析、意图识别和机器翻译等，并进一步探索多模态信息融合的潜力。\\n\\n为了确保滚动条能够出现，我们继续增加一些内容。这项研究的创新之处在于其跨学科的融合，将语音信号处理与自然语言处理技术相结合，为解决多语言环境下的偏见问题提供了新的视角。此外，研究团队还开发了一套可扩展的评估框架，能够全面衡量去偏算法的有效性，并为不同应用场景提供定制化的解决方案。这些努力共同构成了方佳俊同学在多语言文本分类语言偏见去偏研究方面的全面贡献。他的研究不仅具有理论价值，更具备实际应用潜力，有望在未来为全球范围内的多语言信息处理带来积极影响。\\n\\n我们还将进一步探讨二维码在现代商业中的多种应用。除了作为联系客服的便捷工具，二维码还可以被集成到营销活动中，例如扫描二维码获取折扣券、参与抽奖活动或直接跳转到产品购买页面。在物流和仓储管理中，二维码被广泛用于追踪货物，提高效率和准确性。在教育领域，学生可以通过扫描二维码快速访问在线课程资料或提交作业。这些多样化的应用场景充分体现了二维码作为一种高效信息载体的巨大潜力，它极大地简化了信息获取和交互过程，为用户带来了前所未有的便利。方佳俊的研究论文还详细讨论了在不同语言对（如中英、中日）之间进行偏见去偏的挑战和机遇，并提出了针对性的策略。他强调了跨文化语境理解的重要性，以及如何通过引入文化敏感性特征来进一步提升模型的去偏能力。`, disabled: false, area: { top: '34%', left: '15%', width: '70%', height: '3%' }, isExpanded: false, page: 1, confidence: 0.88 },
    { id: 'text_detection_desc_1', type: 'text', content: `1. 检测依据:学校模板《广东工业大学硕士专业学位论文模板》;国家标准《GB7713 学位论文编写格式》,《GB7714参考文献著录规则》,《GB15834标点符号用法》,《GB15835出版物上数字用法》,《GB3100国际单位制及其应用》,《GB3101有关量单位符号的一般原则》,《GB3102空间和时间的量和单位》。\\n\\n本检测报告严格遵循上述国家标准和学校规定，确保检测过程的严谨性和结果的准确性。所有引用规则均经过最新修订，以适应当前学术规范的要求。检测范围涵盖了从论文结构、引用格式到标点符号使用等多个维度，旨在提供全面、细致的格式审查服务。\\n\\n我们致力于帮助学生和研究人员提升论文质量，符合各项出版和学术要求。`, disabled: false, area: { top: '55%', left: '10%', width: '80%', height: '15%' }, isExpanded: false, page: 1, confidence: 0.92 },
    { id: 'table_qr_code_1', type: 'table', url: 'https://placehold.co/600x400/000000/FFFFFF?text=Table+1', imageDescription: '左上角表格，用于展示数据统计。', disabled: false, area: { top: '0%', left: '0%', width: '20%', height: '15%' }, page: 1, confidence: 0.78 },
    { id: 'image_qr_code_2', type: 'image', url: 'https://placehold.co/150x150/000000/FFFFFF?text=QR+Code+2', imageDescription: `右上角二维码，用于微信客服。这个二维码是用户与客服团队进行便捷沟通的桥梁，通过扫描此码，用户可以快速进入客服对话界面，获取帮助、咨询问题或反馈意见。我们致力于提供高效、友好的客户服务体验，确保用户在使用过程中遇到的任何问题都能得到及时解决。此外，该二维码也可能用于推广最新的产品信息、服务更新或特别优惠活动，旨在增强用户粘性并拓展服务范围。我们鼓励所有用户积极利用此功能，以便我们能更好地为您服务，并持续优化我们的产品和体验。您的每一次反馈都对我们至关重要，帮助我们不断进步。`, disabled: false, area: { top: '0%', left: '80%', width: '20%', height: '15%' }, page: 1, confidence: 0.85 },
    { id: 'text_detection_result', type: 'text', content: '检测结果: 全文页数 72, 字符统计 65979, 中文字符 31115, 非中文单词 3372, 问题总数 = 6, 万字差错率 0.90/10000, 结论 合格', disabled: false, area: { top: '80%', left: '10%', width: '80%', height: '10%' }, isExpanded: false, page: 1, confidence: 0.98 },
    { id: 'text_page2_intro', type: 'text', content: '这是第二页的介绍内容，详细阐述了检测流程的初步阶段。', disabled: false, area: { top: '20%', left: '10%', width: '80%', height: '10%' }, isExpanded: false, page: 2, confidence: 0.87 },
    { id: 'image_page2_flowchart', type: 'image', url: 'https://placehold.co/400x200/ADD8E6/FFFFFF?text=Flowchart', imageDescription: '第二页的流程图，展示了检测步骤。', disabled: false, area: { top: '40%', left: '15%', width: '70%', height: '30%' }, page: 2, confidence: 0.91 },
    { id: 'text_page3_details', type: 'text', content: '第三页提供了具体的检测细节和数据分析方法，包括各种算法的运用和结果的解读。本页内容较为专业，旨在为技术人员提供深入的参考。', disabled: false, area: { top: '15%', left: '10%', width: '80%', height: '20%' }, isExpanded: false, page: 3, confidence: 0.84 },
    { id: 'image_page3_graph', type: 'chart', url: 'https://placehold.co/400x250/90EE90/FFFFFF?text=Graph', imageDescription: '第三页的数据图表，显示了性能趋势。', disabled: false, area: { top: '40%', left: '20%', width: '60%', height: '40%' }, page: 3, confidence: 0.89 },
    { id: 'text_page4_conclusion', type: 'text', content: '第四页是报告的结论部分，总结了本次检测的发现和建议，并对未来的研究方向提出了展望。', disabled: false, area: { top: '25%', left: '10%', width: '80%', height: '15%' }, isExpanded: false, page: 4, confidence: 0.93 },
    { id: 'text_page5_appendix', type: 'text', content: '第五页是附录，包含了所有引用的参考文献列表和一些补充材料。', disabled: false, area: { top: '30%', left: '10%', width: '80%', height: '10%' }, isExpanded: false, page: 5, confidence: 0.76 },
    { id: 'text_page1_extra1', type: 'text', content: '这是第一页的额外文本块1，用于填充内容以测试分页效果。', disabled: false, area: { top: '10%', left: '20%', width: '60%', height: '5%' }, isExpanded: false, page: 1, confidence: 0.82 },
    { id: 'text_page1_extra2', type: 'text', content: '这是第一页的额外文本块2，用于填充内容以测试分页效果。', disabled: false, area: { top: '15%', left: '20%', width: '60%', height: '5%' }, isExpanded: false, page: 1, confidence: 0.79 },
    { id: 'text_page1_extra3', type: 'text', content: '这是第一页的额外文本块3，用于填充内容以测试分页效果。', disabled: false, area: { top: '20%', left: '20%', width: '60%', height: '5%' }, isExpanded: false, page: 1, confidence: 0.86 },
    { id: 'text_page2_extra1', type: 'text', content: '这是第二页的额外文本块1。', disabled: false, area: { top: '10%', left: '20%', width: '60%', height: '5%' }, isExpanded: false, page: 2, confidence: 0.73 },
    { id: 'text_page2_extra2', type: 'text', content: '这是第二页的额外文本块2。', disabled: false, area: { top: '15%', left: '20%', width: '60%', height: '5%' }, isExpanded: false, page: 2, confidence: 0.88 },
    { id: 'text_page3_extra1', type: 'text', content: '这是第三页的额外文本块1。', disabled: false, area: { top: '10%', left: '20%', width: '60%', height: '5%' }, isExpanded: false, page: 3, confidence: 0.90 },
];

// 修改parsedBlocks中text_detection_desc_1，支持areas数组
parsedBlocks = parsedBlocks.map(block => {
    if (block.id === 'text_detection_desc_1') {
        return {
            ...block,
            areas: [
                { page: 1, top: '80%', left: '10%', width: '80%', height: '10%' }, // 第1页底部
                { page: 2, top: '0%', left: '10%', width: '80%', height: '10%' }   // 第2页顶部
            ]
        };
    }
    return block;
});

const hoverAreas = parsedBlocks.map(block => ({
    id: block.id,
    x: parseFloat(block.area.left),
    y: parseFloat(block.area.top),
    width: parseFloat(block.area.width),
    height: parseFloat(block.area.height),
    page: block.page
}));


// --- State for SmartSearch ---
let smartSearchQuery = ''; // Renamed from query to avoid conflict
let chatHistory = [];
let smartSearchLoading = false; // Renamed from loading
let smartSearchHighlightedBlockId = null; // Renamed

const smartSearchParsedBlocks = [ // Data specific to SmartSearch view
    { id: 'text_title', type: 'text', content: '学位论文格式检测合格证明', area: { top: '10%', left: '20%', width: '60%', height: '5%' }, confidence: 0.94 },
    { id: 'text_info_unit', type: 'text', content: '送检单位: 广东工业大学', area: { top: '25%', left: '15%', width: '70%', height: '3%' }, confidence: 0.97 },
    { id: 'text_info_title', type: 'text', content: '论文题目: 基于语音辅助的多语言文本分类语言偏见去偏研究方佳俊', area: { top: '29%', left: '15%', width: '70%', height: '5%' }, confidence: 0.95 },
    { id: 'text_info_author', type: 'text', content: '论文作者: 方佳俊 指导教师 阳爱民', area: { top: '34%', left: '15%', width: '70%', height: '3%' }, confidence: 0.88 },
    { id: 'text_detection_desc_1', type: 'text', content: '1. 检测依据:学校模板《广东工业大学硕士专业学位论文模板》;国家标准《GB7713 学位论文编写格式》,《GB7714参考文献著录规则》', area: { top: '55%', left: '10%', width: '80%', height: '15%' }, confidence: 0.92 },
    { id: 'table_qr_code_1', type: 'table', url: 'https://placehold.co/600x400/000000/FFFFFF?text=Table+1', imageDescription: '左上角表格，用于展示数据统计。', area: { top: '0%', left: '0%', width: '20%', height: '15%' }, confidence: 0.78 },
    { id: 'image_qr_code_2', type: 'image', url: 'https://placehold.co/150x150/000000/FFFFFF?text=QR+Code+2', imageDescription: '右上角二维码，用于微信客服。', area: { top: '0%', left: '80%', width: '20%', height: '15%' }, confidence: 0.85 },
    { id: 'text_detection_result', type: 'text', content: '检测结果: 全文页数 72, 字符统计 65979, 中文字符 31115, 非中文单词 3372, 问题总数 6, 万字差错率 0.90/10000, 结论 合格', area: { top: '80%', left: '10%', width: '80%', height: '10%' }, confidence: 0.98 },
];
const smartSearchHoverAreas = smartSearchParsedBlocks.map(block => ({
    id: block.id,
    x: parseFloat(block.area.left),
    y: parseFloat(block.area.top),
    width: parseFloat(block.area.width),
    height: parseFloat(block.area.height),
}));


// Icon SVGs
const Icons = {
    Trash2: (size = 18, className = "") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>`,
    ToggleRight: (size = 24, className = "text-blue-500") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="6" ry="6" fill="currentColor" stroke="none"/><circle cx="17" cy="12" r="4" fill="white" stroke="none"/></svg>`,
    ToggleLeft: (size = 24, className = "text-gray-400") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="12" x="2" y="6" rx="6" ry="6" fill="currentColor" stroke="none"/><circle cx="7" cy="12" r="4" fill="white" stroke="none"/></svg>`,
    Search: (size = 18, className = "text-gray-400") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" x2="16.65" y1="21" y2="16.65"/></svg>`,
    ChevronLeft: (size = 16, className = "") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"/></svg>`,
    ChevronRight: (size = 16, className = "") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
    X: (size = 20, className = "") => `<svg class="${className}" style="width:${size}px; height:${size}px; display:inline-block; vertical-align:middle;" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>`,
};

// Function to set current page and re-render
function setCurrentPage(page) {
    currentPage = page;
    renderApp();
}

// Main render function
function renderApp() {
    const appRoot = document.getElementById('app-root');
    if (!appRoot) {
        console.error("App root not found");
        return;
    }

    const appHTML = `
        <nav class="bg-white shadow-md flex items-center border-b border-gray-200" style="height:56px;">
            <button id="back-btn" class="ml-4 mr-2 w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-blue-100 text-blue-600 transition-colors shadow-sm" title="返回">
                <svg width="22" height="22" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"/></svg>
            </button>
            <div class="flex-1 flex justify-center">
            <button
                id="nav-parsingDetails"
                class="px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                currentPage === 'parsingDetails'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'border-b-2 border-transparent text-gray-700 hover:text-blue-500 hover:border-gray-300'
                } focus:outline-none"
            >
                    处理详情
            </button>
            <button
                id="nav-smartSearch"
                class="px-8 py-3 text-lg font-semibold transition-all duration-300 ${
                currentPage === 'smartSearch'
                    ? 'border-b-2 border-blue-600 text-blue-600'
                    : 'border-b-2 border-transparent text-gray-700 hover:text-blue-500 hover:border-gray-300'
                } focus:outline-none"
            >
                智能检索
            </button>
            </div>
        </nav>

        <div class="flex-grow flex flex-col" style="height:calc(100vh - 56px);min-height:0;">
            <div class="flex flex-row gap-6 mt-4 mb-4 px-4 md:px-0">
                <div class="lg:w-1/3 flex items-center">
                    <span class="flex items-center text-xl font-bold text-gray-900">
                        <span class="inline-block w-2 h-6 bg-blue-500 rounded mr-3"></span>
                        原文件
                        </span>
                    </div>
                <div class="lg:w-2/3 flex items-center justify-between">
                    <span class="flex items-center text-xl font-bold text-gray-900">
                        <span class="inline-block w-2 h-6 bg-blue-500 rounded mr-3"></span>
                        处理结果
                        </span>
                    <button id="export-btn" class="ml-4 mr-6 px-4 py-2 rounded-lg bg-blue-600 text-white font-medium flex items-center gap-2 hover:bg-blue-700 transition-colors shadow" title="下载">
                        <svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
                        下载
                    </button>
                    </div>
                </div>
            <div id="page-content" class="flex-grow flex flex-row h-full min-h-0">
                ${currentPage === 'parsingDetails' ? renderDocumentParsingDetails() : renderSmartSearch()}
            </div>
        </div>
        <div id="modal-container"></div>
    `;

    appRoot.innerHTML = appHTML;

    // Add event listeners for navigation
    document.getElementById('nav-parsingDetails').addEventListener('click', () => setCurrentPage('parsingDetails'));
    document.getElementById('nav-smartSearch').addEventListener('click', () => setCurrentPage('smartSearch'));

    // Render modals if their state is true
    if (showConfirmModalState) {
        renderConfirmationModalInternal(detailViewContent.message); // Assuming detailViewContent.message is what you meant by 'message' for ConfirmationModal
    }
    if (showDetailViewModalState) {
        renderDetailViewModalInternal(detailViewContent.content, detailViewContent.type);
    }
    
    // After rendering the main app, if a specific page's render function needs to attach listeners, it should be called
    // For example, if renderDocumentParsingDetails itself attaches listeners to its generated content:
    if (currentPage === 'parsingDetails') {
        attachDocumentParsingDetailsListeners();
    } else if (currentPage === 'smartSearch') {
        attachSmartSearchListeners();
    }
}

// Placeholder for component rendering functions and listener attachment
function renderDocumentParsingDetails() {
    // console.log("Rendering DocumentParsingDetails component");
    // Helper functions for DocumentParsingDetails
    const getFilteredBlocksForPagination = () => {
        let filtered = parsedBlocks;
        if (displayFilter === 'text') {
            filtered = filtered.filter(block => block.type === 'text' && block.id !== 'text_info_title' && block.id !== 'text_info_author');
        } else if (displayFilter === 'image') {
            filtered = filtered.filter(block => block.type === 'image');
        } else if (displayFilter === 'table') {
            filtered = filtered.filter(block => block.type === 'table');
        } else if (displayFilter === 'title') {
            filtered = filtered.filter(block => block.type === 'title');
        } else if (displayFilter === 'catalog') {
            filtered = filtered.filter(block => block.type === 'catlog');
        }
        if (searchTextQuery) {
            const lowerCaseText = searchTextQuery.toLowerCase();
            filtered = filtered.filter(block =>
                (block.type === 'text' && block.content.toLowerCase().includes(lowerCaseText)) ||
                (block.type === 'image' && block.imageDescription && block.imageDescription.toLowerCase().includes(lowerCaseText)) ||
                (block.type === 'table' && block.content && block.content.toLowerCase().includes(lowerCaseText)) ||
                (block.type === 'title' && block.content && block.content.toLowerCase().includes(lowerCaseText)) ||
                (block.type === 'catalog' && block.content && block.content.toLowerCase().includes(lowerCaseText))
            );
        }
        // 将 QR Code1 和 QR Code2 提到最前面
        const qrOrder = ['image_qr_code_1', 'image_qr_code_2'];
        filtered = [
            ...filtered.filter(b => qrOrder.includes(b.id)),
            ...filtered.filter(b => !qrOrder.includes(b.id))
        ];
        return filtered;
    };

    const getTotalParsedBlocksPages = () => {
        if (expandedBlockId) return 1;
        const filteredBlocks = getFilteredBlocksForPagination();
        return Math.ceil(filteredBlocks.length / blocksPerPage);
    };

    const getTotalFilteredBlocksCount = () => {
        if (expandedBlockId) return 1;
        return getFilteredBlocksForPagination().length;
    };

    const getBlocksForCurrentParsedPage = () => {
        if (expandedBlockId) {
            return parsedBlocks.filter(block => block.id === expandedBlockId);
        }
        const filteredBlocks = getFilteredBlocksForPagination();
        const startIndex = (parsedBlocksCurrentPage - 1) * blocksPerPage;
        const endIndex = startIndex + blocksPerPage;
        return filteredBlocks.slice(startIndex, endIndex);
    };

    const renderBlockHTML = (block) => {
        const isTextBlock = block.type === 'text' || block.type === 'title' || block.type === 'catlog';
        const isTitleBlock = block.type === 'title';
        const isCatalogBlock = block.type === 'catlog';
        const isChartBlock = block.type === 'chart';
        const isExpanded = expandedBlockId === block.id;
        const needsTruncation = isTextBlock && block.content && block.content.length > APPROX_LINE_CHAR_LIMIT;
        const needsTruncationImageDesc = !isTextBlock && block.imageDescription && block.imageDescription.length > APPROX_LINE_CHAR_LIMIT;
        const isHighlighted = highlightedBlockId === block.id || hoveredOriginalArea === block.id;

        // 置信度颜色和显示
        const confidence = block.confidence || 0;
        const confidencePercent = Math.round(confidence * 100);
        // 使用橙色背景，更显眼
        const confidenceColor = 'bg-orange-500 text-white';

        return `
            <div
                id="block-${block.id}"
                class="block-item p-4 rounded-lg border transition-all duration-300 cursor-pointer bg-white border-gray-200 min-w-0 box-border min-h-28 py-6 ${highlightedBlockId === block.id ? 'border-blue-500 ring-2 ring-blue-400 shadow-lg' : ''} ${block.disabled ? 'opacity-50 bg-gray-100' : ''}"
                data-id="${block.id}">
                <div class="flex justify-between items-start mb-2 min-w-0">
                    <div class="flex items-center gap-2 flex-wrap">
                        <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${isTitleBlock ? 'bg-red-50 text-red-600' : isCatalogBlock ? '' : isChartBlock ? 'bg-pink-50 text-pink-600' : isTextBlock ? 'bg-blue-50 text-blue-600' : block.type === 'table' ? 'bg-purple-50 text-purple-600' : block.type === 'image' ? 'bg-green-50 text-green-600' : ''}"${isCatalogBlock ? ' style="background:#FEF3E2;color:#B45309;"' : ''}>
                            ${isTitleBlock ? '标题' : isCatalogBlock ? '目录' : isChartBlock ? '图表' : isTextBlock ? '正文' : block.type === 'table' ? '表格' : block.type === 'image' ? '图片' : ''}
                        </span>
                        <span class="px-2 py-0.5 rounded-full text-xs font-semibold ${confidenceColor}" title="置信度: ${confidencePercent}%">
                            置信度：${confidencePercent}%
                        </span>
                        <span class="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-200 text-gray-600">
                            ID: ${block.id}
                        </span>
                    </div>
                    <div class="flex space-x-3 items-center ml-auto">
                        <button class="delete-block-btn text-gray-500 hover:text-red-600" data-id="${block.id}" title="删除">
                            ${Icons.Trash2(18)}
                        </button>
                        <div class="toggle-disable-btn cursor-pointer" data-id="${block.id}" title="${block.disabled ? '启用' : '禁用'}">
                            ${block.disabled ? Icons.ToggleLeft(24) : Icons.ToggleRight(24)}
                        </div>
                    </div>
                </div>
                ${isTextBlock ? `
                    <p class="text-gray-700 text-sm leading-relaxed max-w-full break-words overflow-x-auto box-border ${!isExpanded && needsTruncation ? 'line-clamp-4' : ''}" style="box-sizing:border-box;">
                        ${!isExpanded && needsTruncation ? `
                            ${escapeHTML(block.content.substring(0, APPROX_LINE_CHAR_LIMIT))}
                            <span class="text-gray-400">...</span>
                            <span class="toggle-expand-btn text-blue-600 hover:underline text-sm font-medium inline-block cursor-pointer ml-1" data-id="${block.id}">展开详情</span>
                        ` : escapeHTML(block.content)}
                    </p>
                    ${isExpanded ? `
                        <button class="toggle-expand-btn text-blue-600 hover:underline text-sm mt-2 font-medium block" data-id="${block.id}">
                            收起
                        </button>
                    ` : ''}
                ` : `
                    <div class="flex items-start space-x-4 min-w-0">
                        <div class="flex-shrink-0">
                            <img src="${block.url}" alt="Parsed Image ${block.id}" class="w-16 h-16 object-contain rounded-md cursor-pointer view-detail-img-btn max-w-full box-border" style="box-sizing:border-box;" data-url="${block.url}" data-type="image" />
                        </div>
                        <div class="flex-grow min-w-0">
                            <p class="text-gray-700 text-sm leading-relaxed max-w-full break-words overflow-x-auto box-border" style="box-sizing:border-box;">
                                ${needsTruncationImageDesc && !isExpanded ? `
                                    ${escapeHTML(block.imageDescription.substring(0, APPROX_LINE_CHAR_LIMIT))}<span class="text-gray-400">...</span>
                                    <button class="toggle-expand-btn text-blue-600 hover:underline text-sm font-medium inline-block" data-id="${block.id}">
                                        展开详情
                                    </button>
                                ` : escapeHTML(block.imageDescription)}
                            </p>
                            ${isExpanded ? `
                                <button class="toggle-expand-btn text-blue-600 hover:underline text-sm mt-2 font-medium block" data-id="${block.id}">
                                    收起
                                </button>
                            ` : ''}
                        </div>
                    </div>
                `}
            </div>
        `;
    };

    const currentBlocksToDisplay = getBlocksForCurrentParsedPage();
    const totalParsedPages = getTotalParsedBlocksPages();
    const totalFilteredCount = getTotalFilteredBlocksCount();

    const html = `
        <div class="flex flex-row h-full min-h-0">
            <div class="lg:w-1/3 bg-white rounded-xl shadow-lg flex flex-col relative overflow-hidden h-full min-h-0">
                <div class="flex flex-col gap-2 mb-2 px-6 pt-6">
                  <div class="flex items-center gap-4 w-full">
                    <div class="flex items-center min-w-0 flex-1">
                      <span class="inline-block px-2 py-0.5 rounded bg-yellow-100 text-yellow-700 text-xs font-semibold">工作流</span>
                      <span class="text-sm text-gray-700 font-medium ml-2 truncate">默认工作流</span>
                        </div>
                    <div class="flex items-center min-w-0 flex-1">
                      <span class="inline-block px-2 py-0.5 rounded bg-blue-100 text-blue-700 text-xs font-semibold">分支</span>
                      <span class="text-sm text-gray-700 font-medium ml-2 truncate">main</span>
                        </div>
                </div>
                  <div class="flex items-center gap-2">
                    <span class="inline-block px-2 py-0.5 rounded bg-green-100 text-green-700 text-xs font-semibold">文件</span>
                    <span class="text-sm text-gray-700 font-medium">2112205248_方佳俊_检测简明报告.pdf</span>
                    </div>
                </div>
                <div class="overflow-y-auto h-full min-h-0">
                  <div class="p-6">
                    <div id="original-doc-preview-list" class="flex flex-col gap-6">
                        ${Array.from({ length: originalFileTotalPages }).map((_, idx) => {
                            const pageNum = idx + 1;
                            return `
                            <div class="relative group border rounded-lg border-gray-200">
                                <img src="https://placehold.co/600x800/E0E0E0/333333?text=Page+${pageNum}"
                                     alt="Original Document Page ${pageNum} Preview"
                                     class="max-w-full object-contain w-full" style="height:600px;"
                                     data-page="${pageNum}" />
                                <div class="absolute left-2 top-2 bg-black bg-opacity-40 text-white text-xs px-2 py-0.5 rounded">
                                    ${pageNum}/${originalFileTotalPages}
            </div>
                                ${highlightedBlockId ? (() => {
                                    const block = parsedBlocks.find(b => b.id === highlightedBlockId);
                                    if (!block) return '';
                                    if (block.areas) {
                                        return block.areas.filter(a => a.page === pageNum).map(area =>
                                            `<div class="absolute bg-blue-500 opacity-30 border-2 border-blue-700 rounded-md animate-pulse pdf-highlight-area" style="top: ${area.top}; left: ${area.left}; width: ${area.width}; height: ${area.height}; pointer-events:auto;" data-block-id="${block.id}"></div>`
                                        ).join('');
                                    } else if (block.area && block.page === pageNum) {
                                        const area = block.area;
                                        return `<div class="absolute bg-blue-500 opacity-30 border-2 border-blue-700 rounded-md animate-pulse pdf-highlight-area" style="top: ${area.top}; left: ${area.left}; width: ${area.width}; height: ${area.height}; pointer-events:auto;" data-block-id="${block.id}"></div>`;
                                    }
                                    return '';
                                })() : ''}
                    </div>
                            `;
                        }).join('')}
                    </div>
                  </div>
                </div>
            </div>
            <div class="lg:w-2/3 bg-white rounded-xl shadow-lg py-1 px-4 flex flex-col h-full min-h-0 flex-grow min-w-0 box-border" style="box-sizing:border-box; max-width:1200px; margin-left:24px; margin-right:24px;">
                <div class="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-2 sm:space-y-0 sm:space-x-4 min-w-0 mt-4">
                    <div class="mb-4">
                      <div class="w-full flex justify-between items-center gap-2 mb-0">
                        <div class="flex gap-2 flex-grow">
                          <div class="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 flex-grow text-base">
                            <span class="text-gray-400 mr-2 flex items-center">${Icons.Search(20)}</span>
                            <input id="dpd-search-text-query" type="text" placeholder="输入想要搜索的内容" value="${searchTextQuery}"
                                   class="flex-grow outline-none text-base bg-transparent" />
                            <button id="dpd-search-text-btn" class="flex items-center justify-center h-full px-3 text-gray-400 hover:text-blue-600 focus:outline-none">${Icons.Search(22)}
                          </div>
                        </div>
                        <div class="flex space-x-2 flex-shrink-0 ml-2">
                          <button id="dpd-filter-all" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                            ${displayFilter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                            全部
                        </button>
                          <button id="dpd-filter-title" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                              ${displayFilter === 'title' ? 'bg-red-100 text-red-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                              标题
                        </button>
                          <button id="dpd-filter-catalog" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                              ${displayFilter === 'catalog' ? 'bg-orange-100 text-orange-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}" style="${displayFilter === 'catalog' ? 'background:#FFEDD5;color:#C2410C;' : ''}">
                              目录
                          </button>
                          <button id="dpd-filter-text" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                              ${displayFilter === 'text' ? 'bg-blue-100 text-blue-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                              正文
                          </button>
                          <button id="dpd-filter-image" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                              ${displayFilter === 'image' ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}
                            图片
                        </button>
                          <button id="dpd-filter-table" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                              ${displayFilter === 'table' ? 'bg-purple-100 text-purple-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                              表格
                          </button>
                          <button id="dpd-filter-chart" class="px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 
                              ${displayFilter === 'chart' ? 'bg-pink-100 text-pink-800' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}">
                              图表
                          </button>
                        </div>
                      </div>
                    </div>
                </div>

                <div class="flex-grow h-[500px] overflow-y-auto pr-2 min-w-0" id="parsed-blocks-container">
                    <div class="space-y-2 min-w-0">
                        ${currentBlocksToDisplay.length > 0 ? currentBlocksToDisplay.map(renderBlockHTML).join('') : '<p class="text-center text-gray-500 py-10">当前筛选条件下没有找到分块内容。</p>'}
                    </div>
                </div>
                
                ${!expandedBlockId && totalParsedPages > 0 ? `
                    <div class="flex justify-between items-center mt-4 flex-wrap">
                        <div class="flex items-center space-x-2 mb-2 md:mb-0">
                            <span class="text-sm text-gray-700">每页显示:</span>
                            <select id="dpd-blocks-per-page" class="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option value="5" ${blocksPerPage === 5 ? 'selected' : ''}>5</option>
                                <option value="10" ${blocksPerPage === 10 ? 'selected' : ''}>10</option>
                                <option value="20" ${blocksPerPage === 20 ? 'selected' : ''}>20</option>
                            </select>
                        </div>

                        <div class="flex justify-center items-center space-x-2 mb-2 md:mb-0">
                             <button id="dpd-parsed-prev-page" class="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" ${parsedBlocksCurrentPage === 1 ? 'disabled' : ''}>
                                ${Icons.ChevronLeft(16)}
                            </button>
                            ${Array.from({ length: totalParsedPages }).map((_, index) => `
                                <button class="dpd-parsed-page-btn px-3 py-1 rounded-md text-sm font-medium transition-colors duration-200 
                                    ${parsedBlocksCurrentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}" data-page="${index + 1}">
                                    ${index + 1}
                                </button>
                            `).join('')}
                            <button id="dpd-parsed-next-page" class="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed" ${parsedBlocksCurrentPage === totalParsedPages ? 'disabled' : ''}>
                                ${Icons.ChevronRight(16)}
                            </button>
                            <span class="text-gray-700 font-medium ml-4">
                                共 ${totalFilteredCount} 块
                            </span>
                        </div>
                    </div>
                ` : ''}
            </div>
        </div>
    `;
    return html;
}

function attachDocumentParsingDetailsListeners() {
    // console.log("Attaching DocumentParsingDetails listeners");

    // Left Panel: Original Document Preview
    const previewList = document.getElementById('original-doc-preview-list');
    if (previewList) {
        // 移除点击事件，不再允许点击页面切换高亮
        // previewList.addEventListener('click', ...); // 注释或删除
        // 滚动时自动同步当前页
        previewList.addEventListener('scroll', () => {
            const imgs = Array.from(previewList.querySelectorAll('img[data-page]'));
            let minDiff = Infinity;
            let current = 1;
            imgs.forEach(img => {
                const rect = img.getBoundingClientRect();
                const parentRect = previewList.getBoundingClientRect();
                const diff = Math.abs(rect.top - parentRect.top);
                if (diff < minDiff) {
                    minDiff = diff;
                    current = Number(img.dataset.page);
                }
            });
            if (current !== originalFileCurrentPage) {
                originalFileCurrentPage = current;
                parsedBlocksCurrentPage = 1;
                expandedBlockId = null; // Reset expanded block when changing doc page
                renderApp();
            }
        });
    }

    const dpdPrevPageBtn = document.getElementById('dpd-prev-page');
    if (dpdPrevPageBtn) {
        dpdPrevPageBtn.addEventListener('click', () => {
            if (originalFileCurrentPage > 1) {
                originalFileCurrentPage--;
                // Sync right panel pagination
                parsedBlocksCurrentPage = 1; 
                expandedBlockId = null; // Reset expanded block when changing doc page
                renderApp();
            }
        });
    }

    const dpdNextPageBtn = document.getElementById('dpd-next-page');
    if (dpdNextPageBtn) {
        dpdNextPageBtn.addEventListener('click', () => {
            if (originalFileCurrentPage < originalFileTotalPages) {
                originalFileCurrentPage++;
                // Sync right panel pagination
                parsedBlocksCurrentPage = 1; 
                expandedBlockId = null; // Reset expanded block when changing doc page
                renderApp();
            }
        });
    }

    // Right Panel: Parsed Content Display
    const searchTextInput = document.getElementById('dpd-search-text-query');
    const searchTextBtn = document.getElementById('dpd-search-text-btn');
    if (searchTextInput && searchTextBtn) {
      searchTextBtn.addEventListener('click', () => {
        searchTextQuery = searchTextInput.value;
        parsedBlocksCurrentPage = 1;
        expandedBlockId = null;
        renderApp();
      });
      searchTextInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          searchTextQuery = searchTextInput.value;
          parsedBlocksCurrentPage = 1;
          expandedBlockId = null;
          renderApp();
        }
      });
    }

    document.getElementById('dpd-filter-all')?.addEventListener('click', () => { setDisplayFilterAndRefresh('all'); });
    document.getElementById('dpd-filter-text')?.addEventListener('click', () => { setDisplayFilterAndRefresh('text'); });
    document.getElementById('dpd-filter-image')?.addEventListener('click', () => { setDisplayFilterAndRefresh('image'); });
    document.getElementById('dpd-filter-table')?.addEventListener('click', () => { setDisplayFilterAndRefresh('table'); });
    document.getElementById('dpd-filter-title')?.addEventListener('click', () => { setDisplayFilterAndRefresh('title'); });
    document.getElementById('dpd-filter-catalog')?.addEventListener('click', () => { setDisplayFilterAndRefresh('catalog'); });
    document.getElementById('dpd-filter-chart')?.addEventListener('click', () => { setDisplayFilterAndRefresh('chart'); });

    function setDisplayFilterAndRefresh(filter) {
        displayFilter = filter;
        parsedBlocksCurrentPage = 1; // Reset to first page on filter change
        expandedBlockId = null; // Reset expanded block
        renderApp();
    }

    // Event delegation for block items
    const parsedBlocksContainer = document.getElementById('parsed-blocks-container');
    if (parsedBlocksContainer) {
        parsedBlocksContainer.addEventListener('click', (e) => {
            const target = e.target;
            let blockItem = target.closest('.block-item');
            let blockId = blockItem?.dataset.id;

            // Delete button
            if (target.closest('.delete-block-btn')) {
                e.stopPropagation();
                blockId = target.closest('.delete-block-btn').dataset.id;
                handleDeleteClick(blockId);
                return;
            }
            // Toggle disable button
            if (target.closest('.toggle-disable-btn')) {
                e.stopPropagation();
                blockId = target.closest('.toggle-disable-btn').dataset.id;
                handleToggleDisable(blockId);
                return;
            }
            // Toggle expand button
            if (target.closest('.toggle-expand-btn')) {
                e.stopPropagation();
                blockId = target.closest('.toggle-expand-btn').dataset.id;
                handleToggleExpand(blockId);
                return;
            }
            // View detail image button
            if (target.closest('.view-detail-img-btn')){
                e.stopPropagation();
                const btn = target.closest('.view-detail-img-btn');
                openDetailViewModal(btn.dataset.url, btn.dataset.type);
                return;
            }
            // 点击分块本身高亮
            if (blockItem && blockId) {
                         handleBlockSelect(blockId);
            }
        });
    }

    // Pagination for Parsed Blocks
    const blocksPerPageSelect = document.getElementById('dpd-blocks-per-page');
    if (blocksPerPageSelect) {
        blocksPerPageSelect.addEventListener('change', (e) => {
            blocksPerPage = Number(e.target.value);
            parsedBlocksCurrentPage = 1; // Reset to first page
            expandedBlockId = null;
            renderApp();
        });
    }

    document.getElementById('dpd-parsed-prev-page')?.addEventListener('click', () => {
        if (parsedBlocksCurrentPage > 1) {
            parsedBlocksCurrentPage--;
            renderApp();
        }
    });

    document.getElementById('dpd-parsed-next-page')?.addEventListener('click', () => {
        const totalPages = getTotalParsedBlocksPages(); // Recalculate based on current filters
        if (parsedBlocksCurrentPage < totalPages) {
            parsedBlocksCurrentPage++;
            renderApp();
        }
    });

    document.querySelectorAll('.dpd-parsed-page-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            parsedBlocksCurrentPage = Number(e.target.dataset.page);
            renderApp();
        });
    });

    // Effect to sync parsedBlocksCurrentPage when filters or originalFileCurrentPage changes
    // This logic is handled by resetting to page 1 directly in filter/page change handlers
    // and then re-render will use the updated getTotalParsedBlocksPages for validation.
    const totalPages = getTotalParsedBlocksPages();
    if (parsedBlocksCurrentPage > totalPages && totalPages > 0) {
        parsedBlocksCurrentPage = totalPages;
        // No direct re-render here, as this is part of the render cycle
    } else if (totalPages === 0 && parsedBlocksCurrentPage !== 1) {
        parsedBlocksCurrentPage = 1;
    }

    // PDF高亮区域悬浮显示tooltip
    setTimeout(() => {
      // 先移除所有旧的tooltip，避免残留
      document.querySelectorAll('#pdf-block-tooltip').forEach(tip => tip.remove());
      const previewList = document.getElementById('original-doc-preview-list');
      if (previewList) {
        previewList.querySelectorAll('.pdf-highlight-area').forEach(area => {
          area.addEventListener('mouseenter', (e) => {
            const blockId = area.getAttribute('data-block-id');
            console.log('mouseenter', blockId); // 调试用
            const block = parsedBlocks.find(b => b.id === blockId);
            if (!block) return;
            let tooltip = document.createElement('div');
            tooltip.className = 'preview-tooltip';
            tooltip.id = 'pdf-block-tooltip';
            tooltip.style.zIndex = '9999';
            tooltip.style.border = '1px solid #2563eb';
            tooltip.style.boxShadow = '0 4px 16px 0 rgba(37,99,235,0.15)';
            tooltip.style.background = '#2D3748';
            tooltip.innerHTML = block.type === 'text' ? escapeHTML(block.content).slice(0, 300) : `<img src='${block.url}' style='max-width:180px;max-height:120px;border-radius:8px;'><div class='mt-1 text-xs text-gray-200'>${escapeHTML(block.imageDescription||'')}</div>`;
            document.body.appendChild(tooltip);
            const moveHandler = (ev) => {
              tooltip.style.left = (ev.clientX + 16) + 'px';
              tooltip.style.top = (ev.clientY + 16) + 'px';
            };
            moveHandler(e);
            area.addEventListener('mousemove', moveHandler);
            area._moveHandler = moveHandler;
          });
          area.addEventListener('mouseleave', (e) => {
            const tooltip = document.getElementById('pdf-block-tooltip');
            if (tooltip) tooltip.remove();
            if (area._moveHandler) area.removeEventListener('mousemove', area._moveHandler);
          });
        });
      }
    }, 0);

    // 在attachDocumentParsingDetailsListeners中加导出按钮事件
    const exportBtn = document.getElementById('export-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        alert('导出功能开发中');
      });
    }
}

// --- Helper functions for DocumentParsingDetails logic ---
function handleDeleteClick(id) {
    blockToDeleteId = id;
    // Use the global showConfirmationModal function
    showConfirmationModal("您确定要删除此分块吗？此操作不可撤销。", confirmDelete, cancelDelete);
}

function confirmDelete() {
    parsedBlocks = parsedBlocks.filter(block => block.id !== blockToDeleteId);
    blockToDeleteId = null;
    if (expandedBlockId === blockToDeleteId) expandedBlockId = null; // Clear expansion if deleted
    renderApp(); // Re-render the UI
}

function cancelDelete() {
    blockToDeleteId = null;
    // Modal is closed by showConfirmationModal's internal logic
    renderApp(); // Just in case, to ensure UI consistency if needed
}

function handleToggleDisable(id) {
    parsedBlocks = parsedBlocks.map(block =>
        block.id === id ? { ...block, disabled: !block.disabled } : block
    );
    renderApp();
}

function handleToggleExpand(id) {
    if (expandedBlockId === id) {
        expandedBlockId = null;
        renderApp();
        return;
    }
    expandedBlockId = id;
    renderApp();
    // 展开后弹出modal浮层
    setTimeout(() => {
        const block = parsedBlocks.find(b => b.id === id);
        if (!block) return;
        let modal = document.createElement('div');
        modal.id = 'block-expand-modal';
        modal.style.position = 'fixed';
        modal.style.left = '0';
        modal.style.top = '0';
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.zIndex = '9999';
        modal.style.background = 'rgba(0,0,0,0.18)';
        modal.innerHTML = `
          <div style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#fff;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.18);max-width:800px;width:90vw;max-height:80vh;overflow:auto;padding:32px;">
            <div style='display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;'>
              <span style='font-size:18px;font-weight:bold;'>${block.type === 'text' ? '文本详情' : '图片详情'}</span>
              <button id='block-expand-close' style='font-size:20px;color:#888;background:none;border:none;cursor:pointer;'>&times;</button>
            </div>
            <div style='font-size:15px;line-height:1.8;white-space:pre-wrap;'>
              ${block.type === 'text' ? escapeHTML(block.content) : `<img src='${block.url}' style='max-width:100%;border-radius:8px;'><div style='margin-top:8px;color:#666;'>${escapeHTML(block.imageDescription||'')}</div>`}
            </div>
          </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('block-expand-close').onclick = () => {
          expandedBlockId = null;
          modal.remove();
          renderApp();
        };
        modal.onclick = (e) => {
          if (e.target === modal) {
            expandedBlockId = null;
            modal.remove();
            renderApp();
    }
        };
    }, 0);
}

function openDetailViewModal(content, type) {
    // Uses the global showDetailViewModal
    showDetailViewModal(content, type);
}

// This function is ALREADY DEFINED GLOBALLY: closeDetailViewModal

function handleBlockSelect(id) {
    highlightedBlockId = id;
    const areaToScroll = hoverAreas.find(area => area.id === id);
    if (areaToScroll) {
        // 只滚动左侧，不影响右侧分页等
        renderApp(); 
        setTimeout(() => {
            const previewList = document.getElementById('original-doc-preview-list');
            if (previewList) {
                const img = previewList.querySelector(`img[data-page='${areaToScroll.page}']`);
                if (img) {
                    img.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        }, 100);
    }
}

function renderSmartSearch() {
    // console.log("Rendering SmartSearch component");

    const renderTextPartHTML = (part, index) => {
        // In plain JS, we assume parts are already structured correctly,
        // and `type: "text"` is the primary thing we care about for display here.
        // The original React code had `if (part.type === "text")`, so we stick to that.
        if (part.type === "text") {
            return `<span key="${index}">${escapeHTML(part.content)}</span>`;
        }
        return '';
    };

    const renderSegmentReferencesHTML = (segmentRefs) => {
        if (!segmentRefs || segmentRefs.length === 0) return '';
        return `
            <div class="flex flex-wrap gap-2 mt-2 pt-2 border-t border-gray-200">
                ${segmentRefs.map((ref, index) => `
                    <button
                        key="${index}"
                        class="smart-search-segment-btn inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 cursor-pointer hover:bg-blue-200 transition-colors duration-200"
                        data-segment-id="${ref.segmentId}"
                    >
                        ${escapeHTML(ref.displayText)}
                    </button>
                `).join('')}
            </div>
        `;
    };

    const html = `
    <div class="flex flex-col lg:flex-row gap-6 h-full" id="smart-search-content">
        <!-- Left Panel: Original File Preview -->
        <div class="lg:w-1/3 bg-white rounded-xl shadow-lg p-6 flex flex-col relative overflow-hidden">
            <h2 class="text-xl font-bold mb-4 text-gray-800">解析详情</h2>
            <p class="text-sm text-gray-500 mb-2">2112205248_方佳俊_检测简明报告.pdf</p>

            <div id="smart-search-doc-preview" class="relative flex-grow bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center mb-4">
                <img 
                    src="https://placehold.co/600x800/E0E0E0/333333?text=检测简明报告" 
                    alt="Original Document Preview"
                    class="max-w-full max-h-full object-contain"
                />
                ${smartSearchHighlightedBlockId && smartSearchParsedBlocks.find(b => b.id === smartSearchHighlightedBlockId) ? `
                    <div class="absolute bg-blue-500 opacity-30 border-2 border-blue-700 rounded-md animate-pulse"
                         style="top: ${smartSearchHoverAreas.find(a => a.id === smartSearchHighlightedBlockId)?.y}%; 
                                left: ${smartSearchHoverAreas.find(a => a.id === smartSearchHighlightedBlockId)?.x}%; 
                                width: ${smartSearchHoverAreas.find(a => a.id === smartSearchHighlightedBlockId)?.width}%; 
                                height: ${smartSearchHoverAreas.find(a => a.id === smartSearchHighlightedBlockId)?.height}%;">
                    </div>
                ` : ''}
            </div>
            <p class="mt-4 text-gray-600 text-sm">
                点击文档对话中的分段引用可在此处高亮对应区域。
            </p>
        </div>

        <!-- Right Panel: Document Dialogue -->
        <div class="lg:w-2/3 bg-white rounded-xl shadow-lg p-6 flex flex-col">
            <h2 class="text-xl font-bold mb-4 text-gray-800">文档对话</h2>
            <div class="flex-grow flex flex-col border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div id="chat-history-container" class="flex-grow overflow-y-auto mb-4 p-2 pr-4 space-y-4 bg-white rounded-md shadow-inner">
                    ${chatHistory.length === 0 ? '<p class="text-gray-500 text-center py-4">向我提问关于文档的问题...</p>' : ''}
                    ${chatHistory.map((msg, index) => `
                        <div key="${index}" class="flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}">
                            <div class="p-3 rounded-lg max-w-[80%] 
                                ${msg.role === 'user' ? 'bg-blue-500 text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}">
                                ${msg.parts.map(renderTextPartHTML).join('')}
                                ${msg.role === 'model' && msg.segmentRefs ? renderSegmentReferencesHTML(msg.segmentRefs) : ''}
                            </div>
                        </div>
                    `).join('')}
                    ${smartSearchLoading ? `
                        <div class="flex justify-center">
                            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                        </div>
                    ` : ''}
                </div>
                <div class="flex">
                    <input 
                        id="smart-search-query-input"
                        type="text" 
                        value="${escapeHTML(smartSearchQuery)}" 
                        placeholder="输入您的问题..."
                        class="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
                        ${smartSearchLoading ? 'disabled' : ''}
                    />
                    <button 
                        id="smart-search-submit-btn"
                        class="px-6 py-3 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors duration-200 shadow-md"
                        ${smartSearchLoading ? 'disabled' : ''}
                    >
                        发送
                    </button>
                </div>
            </div>
        </div>
    </div>
    `;
    return html;
}

async function handleChatSubmit() {
    if (!smartSearchQuery.trim()) return;

    const userMessage = { role: "user", parts: [{ type: "text", content: smartSearchQuery }] };
    chatHistory = [...chatHistory, userMessage];
    smartSearchLoading = true;
    const currentQuery = smartSearchQuery; // Store current query before clearing
    smartSearchQuery = ''; // Clear input state

    renderApp(); // Update UI to show user message and loading spinner

    try {
        let directAnswer = "";
        let segmentRefs = [];

        if (currentQuery.includes("论文题目")) {
            directAnswer = "该学位论文的题目是\"基于语音辅助的多语言文本分类语言偏见去偏研究方佳俊\"。";
            segmentRefs = [{ segmentId: "text_info_title", displayText: "引用1" }];
        } else if (currentQuery.includes("检测结果")) {
            directAnswer = "检测结果显示，全文页数72，字符统计65979，中文字符31115，非中文单词3372，问题总数6，万字差错率0.90/10000，结论为合格。";
            segmentRefs = [{ segmentId: "text_detection_result", displayText: "引用2" }];
        } else if (currentQuery.includes("检测依据")) {
            directAnswer = "检测依据包括学校模板《广东工业大学硕士专业学位论文模板》以及多项国家标准，如《GB7713 学位论文编写格式》等。";
            segmentRefs = [{ segmentId: "text_detection_desc_1", displayText: "引用3" }];
        } else if (currentQuery.includes("作者")) {
            directAnswer = "论文作者是方佳俊，指导教师是阳爱民。";
            segmentRefs = [{ segmentId: "text_info_author", displayText: "引用1" }];
        } else {
            directAnswer = "根据您的问题，我从文档中找到了相关信息。请点击下方的引用查看详情。";
            segmentRefs = [
                { segmentId: "text_info_title", displayText: "引用1" },
                { segmentId: "text_detection_result", displayText: "引用2" },
                { segmentId: "text_detection_desc_1", displayText: "引用3" }
            ];
        }

        await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call

        chatHistory = [...chatHistory, {
            role: "model",
            parts: [{ type: "text", content: directAnswer }],
            segmentRefs: segmentRefs
        }];

    } catch (error) {
        chatHistory = [...chatHistory, { role: "model", parts: [{ type: "text", content: "抱歉，调用API时发生错误。" }] }];
        console.error("Error calling LLM API:", error);
    } finally {
        smartSearchLoading = false;
        renderApp(); // Update UI with model response/error and stop loading
        // Scroll to bottom of chat
        const chatContainer = document.getElementById('chat-history-container');
        if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}

function handleSegmentClick(segmentId) {
    smartSearchHighlightedBlockId = segmentId;
    // console.log(`高亮显示分段: ${segmentId}`);
    renderApp(); // Re-render to show highlight
    // Optionally scroll the original document preview to the highlighted area
    const docPreviewEl = document.getElementById('smart-search-doc-preview');
    const areaToScroll = smartSearchHoverAreas.find(area => area.id === segmentId);
    if (docPreviewEl && areaToScroll) {
        const imgElement = docPreviewEl.querySelector('img');
        if (imgElement) {
            const imgHeight = imgElement.offsetHeight;
            const containerHeight = docPreviewEl.offsetHeight;
            const targetY = (areaToScroll.y / 100) * imgHeight;
            const scrollPosition = targetY - (containerHeight / 2); 
            docPreviewEl.scrollTop = Math.max(0, scrollPosition);
        }
    }
}

function attachSmartSearchListeners() {
    // console.log("Attaching SmartSearch listeners");
    const queryInput = document.getElementById('smart-search-query-input');
    if (queryInput) {
        queryInput.addEventListener('input', (e) => {
            smartSearchQuery = e.target.value;
            // No re-render on input, value is bound in renderSmartSearch
        });
        queryInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !smartSearchLoading) {
                handleChatSubmit();
            }
        });
    }

    const submitButton = document.getElementById('smart-search-submit-btn');
    if (submitButton) {
        submitButton.addEventListener('click', () => {
             if (!smartSearchLoading) handleChatSubmit();
        });
    }

    // Event delegation for segment buttons
    const chatContainer = document.getElementById('chat-history-container');
    if (chatContainer) {
        chatContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.smart-search-segment-btn');
            if (target && target.dataset.segmentId) {
                handleSegmentClick(target.dataset.segmentId);
            }
        });
        // Scroll to bottom of chat on initial load if there's history
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
}


// --- Modal Rendering and Logic (stubs for now, will be internal) ---
// The actual modal rendering will inject into #modal-container
// Public functions to trigger modals:
function showConfirmationModal(message, onConfirmCallback, onCancelCallback) {
    showConfirmModalState = true;
    // Store callbacks and message to be used by renderConfirmationModalInternal
    window._modalConfirmCallback = onConfirmCallback;
    window._modalCancelCallback = onCancelCallback;
    window._modalMessage = message;
    renderApp(); // Re-render to show modal
}

function closeConfirmationModal() {
    showConfirmModalState = false;
    renderApp(); // Re-render to hide modal
}

function showDetailViewModal(content, type) {
    showDetailViewModalState = true;
    detailViewContent = { content, type };
    renderApp();
}

function closeDetailViewModal() {
    showDetailViewModalState = false;
    detailViewContent = { content: '', type: '' };
    renderApp();
}

// Internal rendering functions for modals
function renderConfirmationModalInternal() {
    if (!showConfirmModalState) {
        document.getElementById('modal-container').innerHTML = '';
        return;
    }
    const message = window._modalMessage || "您确定吗?";
    const modalHTML = `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-xl shadow-lg p-6 w-96 max-w-full">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">确认操作</h3>
          <button id="modal-cancel-x" class="text-gray-500 hover:text-gray-700">
            ${Icons.X(20)}
          </button>
        </div>
        <p class="text-gray-700 mb-6">${message}</p>
        <div class="flex justify-end space-x-3">
          <button id="modal-cancel-btn" class="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors">
            取消
          </button>
          <button id="modal-confirm-btn" class="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors">
            确认删除
          </button>
        </div>
      </div>
    </div>
  `;
    document.getElementById('modal-container').innerHTML = modalHTML;

    document.getElementById('modal-confirm-btn').addEventListener('click', () => {
        if (window._modalConfirmCallback) window._modalConfirmCallback();
        closeConfirmationModal();
    });
    const cancelAction = () => {
        if (window._modalCancelCallback) window._modalCancelCallback();
        closeConfirmationModal();
    };
    document.getElementById('modal-cancel-btn').addEventListener('click', cancelAction);
    document.getElementById('modal-cancel-x').addEventListener('click', cancelAction);
}

function renderDetailViewModalInternal(content, type) {
    if (!showDetailViewModalState) {
        document.getElementById('modal-container').innerHTML = '';
        return;
    }
    const modalHTML = `
    <div class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            ${type === 'text' ? '文本详情' : '图片详情'}
          </h3>
          <button id="detail-modal-close-x" class="text-gray-500 hover:text-gray-700">
            ${Icons.X(20)}
          </button>
        </div>
        <div class="flex-grow overflow-y-auto pr-2">
          ${type === 'text' ?
            `<p class="text-gray-700 text-base leading-relaxed whitespace-pre-wrap">${content}</p>` :
            `<div class="flex justify-center items-center h-full">
               <img src="${content}" alt="Full size" class="max-w-full max-h-[70vh] object-contain rounded-md" />
             </div>`
          }
        </div>
        ${type === 'text' ? `<div class="flex justify-end mt-4">
          <button id="detail-modal-close-btn" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
            关闭
          </button>
        </div>` : ''}
      </div>
    </div>
  `;
    document.getElementById('modal-container').innerHTML = modalHTML;
    document.getElementById('detail-modal-close-x').addEventListener('click', closeDetailViewModal);
    if (type === 'text') {
    document.getElementById('detail-modal-close-btn').addEventListener('click', closeDetailViewModal);
    }
}


// Initial setup
document.addEventListener('DOMContentLoaded', () => {
    renderApp();
});

// Helper function to escape HTML content
function escapeHTML(str) {
    if (typeof str !== 'string') return '';
    return str.replace(/[&<>"']/g, function (match) {
        return {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        }[match];
    });
} 