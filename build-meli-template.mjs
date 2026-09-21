import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "outputs";
const outputPath = `${outputDir}/美客多智利批量上架模板.xlsx`;
const workbook = Workbook.create();
const fontName = "Microsoft YaHei";
const colors = {
  navy: "#1F2937",
  yellow: "#FFF4CC",
  blue: "#E8F1FB",
  green: "#E7F4EA",
  red: "#FDE8E7",
  gray: "#F3F4F6",
  line: "#CBD5E1",
  text: "#17202A",
  muted: "#5B6470"
};

function styleTitle(sheet, range, title, subtitle) {
  sheet.showGridLines = false;
  sheet.getRange(range).values = [[title]];
  sheet.getRange(range).format.font = { name: fontName, size: 15, bold: true, color: colors.text };
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange("A2").format.font = { name: fontName, size: 10, italic: true, color: colors.muted };
  sheet.getRange("A3:Z3").format.borders = { bottom: { style: "thin", color: colors.line } };
}

function styleHeader(range) {
  range.format = {
    fill: colors.navy,
    font: { name: fontName, size: 10, bold: true, color: "#FFFFFF" },
    horizontalAlignment: "center",
    verticalAlignment: "center",
    wrapText: true,
    borders: { insideVertical: { style: "thin", color: "#FFFFFF" } }
  };
  range.format.rowHeight = 38;
}

const products = workbook.worksheets.add("商品主表");
styleTitle(products, "A1", "智利美客多批量上架商品表", "一行填写一个商品。黄色区域可编辑；示例行仅用于说明，提交前请删除或改成“跳过”。");
const productHeaders = [
  "操作 action", "采购链接 source_url", "竞品链接 competitor_urls", "主SKU sku", "原始标题 title_source", "西语标题 title_es",
  "原始描述 description_source", "西语描述 description_es", "类目提示 category_hint", "类目ID category_id",
  "售价(CLP) price_clp", "库存 stock", "状态 condition", "刊登类型 listing_type", "品牌 brand", "型号 model",
  "条码 gtin", "保修类型 warranty_type", "保修期限 warranty_time", "备货天数 handling_days", "发货方式 shipping_mode",
  "图片URL picture_urls", "有变体 has_variations", "其他属性JSON attribute_json", "卖家备注 notes", "校验状态"
];
products.getRange("A4:Z4").values = [productHeaders];
styleHeader(products.getRange("A4:Z4"));
products.getRange("A5:Z5").values = [[
  "跳过", "https://supplier.example/product-001", "https://articulo.mercadolibre.cl/competidor-001", "FX-001", "示例商品原始标题", "Producto de ejemplo",
  "示例原始描述", "Descripción del producto de ejemplo.", "Carretes de pesca", "", 19990, 10, "new", "gold_special",
  "Furaxis", "FX5000", "", "Garantía del vendedor", "3 meses", 2, "自定义/待确认",
  "https://example.com/1.jpg, https://example.com/2.jpg", "否", "", "这是示例行，请替换", "示例行"
]];
products.getRange("A5:Z5").format = { fill: colors.blue, font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "top", wrapText: true };
products.getRange("A6:Y205").format = { fill: colors.yellow, font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "top", wrapText: true };
products.getRange("Z6").formulas = [["=IF(COUNTA(B6:Y6)=0,\"\",IF(OR(B6=\"\",C6=\"\",D6=\"\",K6=\"\",L6=\"\"),\"缺少必填\",\"待API校验\"))"]];
products.getRange("Z6:Z205").fillDown();
products.getRange("Z6:Z205").format = { fill: colors.gray, font: { name: fontName, size: 10, bold: true, color: colors.text }, horizontalAlignment: "center" };
products.getRange("A4:Z205").format.borders = { insideHorizontal: { style: "thin", color: "#E5E7EB" } };
products.getRange("A5:A205").dataValidation = { rule: { type: "list", values: ["发布", "仅检查", "跳过"] } };
products.getRange("M5:M205").dataValidation = { rule: { type: "list", values: ["new", "used"] } };
products.getRange("N5:N205").dataValidation = { rule: { type: "list", values: ["gold_special", "gold_pro", "free"] } };
products.getRange("W5:W205").dataValidation = { rule: { type: "list", values: ["是", "否"] } };
products.getRange("K5:K205").format.numberFormat = "#,##0";
products.getRange("L5:L205").format.numberFormat = "0";
products.getRange("T5:T205").format.numberFormat = "0";
products.getRange("A4:Z205").conditionalFormats.addCustom('=AND(COUNTA($B5:$Y5)>0,OR($B5="",$C5="",$D5="",$K5="",$L5=""))', { fill: colors.red, font: { color: "#9B1C1C" } });
products.freezePanes.freezeRows(4);
products.freezePanes.freezeColumns(4);
const productWidths = [12,34,38,16,26,28,28,30,22,18,16,11,12,18,16,16,18,22,18,14,20,40,16,34,28,16];
productWidths.forEach((width, index) => { products.getRangeByIndexes(0, index, 206, 1).format.columnWidth = width; });
products.getRange("A5:Z205").format.rowHeight = 34;
const productsTable = products.tables.add("A4:Z205", true, "MeliProducts");
productsTable.style = "TableStyleMedium2";

const variations = workbook.worksheets.add("变体明细");
styleTitle(variations, "A1", "商品变体明细", "仅多颜色、多尺寸等商品填写。每行代表一个可销售变体，主SKU必须与商品主表一致。");
const variationHeaders = ["主SKU parent_sku", "变体SKU variation_sku", "颜色 color", "尺寸 size", "库存 stock", "价格覆盖 price_override", "条码 gtin", "变体图片URL picture_urls", "其他属性JSON attribute_json", "备注 notes"];
variations.getRange("A4:J4").values = [variationHeaders];
styleHeader(variations.getRange("A4:J4"));
variations.getRange("A5:J5").values = [["FX-001", "FX-001-RED-L", "Rojo", "L", 5, "", "", "https://example.com/red-l.jpg", "", "示例行，请删除"]];
variations.getRange("A5:J5").format = { fill: colors.blue, font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "top", wrapText: true };
variations.getRange("A6:J405").format = { fill: colors.yellow, font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "top", wrapText: true };
variations.getRange("E5:F405").format.numberFormat = "#,##0";
variations.freezePanes.freezeRows(4);
variations.freezePanes.freezeColumns(2);
[18,20,16,14,12,20,18,38,36,28].forEach((width, index) => { variations.getRangeByIndexes(0, index, 406, 1).format.columnWidth = width; });
variations.getRange("A5:J405").format.rowHeight = 32;
const variationsTable = variations.tables.add("A4:J405", true, "MeliVariations");
variationsTable.style = "TableStyleMedium2";

const guide = workbook.worksheets.add("填写说明");
styleTitle(guide, "A1", "填写说明与字段字典", "标为“是”的字段必须提供；标为“按类目”的字段会通过 Mercado Libre 智利站 API 动态确认。");
guide.getRange("A4:E4").values = [["字段", "必填", "填写要求", "示例", "处理方式"]];
styleHeader(guide.getRange("A4:E4"));
const guideRows = [
  ["操作 action", "是", "发布、仅检查或跳过。建议首批选择“仅检查”。", "仅检查", "控制是否真实提交"],
  ["采购链接 source_url", "是", "供应商或采购商品的完整链接。", "https://...", "用于采集标题、特性、规格和图片"],
  ["竞品链接 competitor_urls", "是", "填写一个主要竞品链接；多个链接可用换行分隔。", "https://articulo.mercadolibre.cl/...", "提取竞品标题，并扩展分析同类前五个结果"],
  ["主SKU sku", "是", "店铺内唯一，建议只用字母、数字、短横线。", "FX-001", "用于去重、更新与变体关联"],
  ["原始标题/描述", "建议", "可直接粘贴中文或来源语言内容。", "商品原文", "用于翻译和信息核对"],
  ["西语标题/描述", "否", "可留空，系统按“内容规则”生成智利西班牙语内容。", "Producto...", "生成后进入预览"],
  ["类目提示 category_hint", "建议", "用普通文字说明商品类型。", "Carretes de pesca", "帮助匹配 MLC 类目"],
  ["类目ID category_id", "否", "知道准确 MLC 类目时填写，否则留空。", "MLC...", "通过 API 推荐并校验"],
  ["售价 price_clp", "是", "最终智利售价，填写正整数，不带货币符号。", 19990, "作为 CLP 价格提交"],
  ["库存 stock", "是", "可销售库存，填写 0 或正整数。", 10, "创建或同步库存"],
  ["状态 condition", "建议", "new 或 used。默认 new。", "new", "映射商品状态"],
  ["刊登类型 listing_type", "建议", "常用 gold_special；最终按账号可用类型校验。", "gold_special", "影响费用和曝光"],
  ["品牌/型号", "按类目", "尽量填写真实品牌和型号。", "Furaxis / FX5000", "转换为 attributes"],
  ["条码 gtin", "按类目", "填写 EAN/UPC/GTIN；没有时不要编造。", "780...", "按类目规则处理"],
  ["保修", "按类目", "填写保修类型和时长。", "Garantía del vendedor / 3 meses", "转换为 sale_terms"],
  ["备货天数", "否", "下单后预计备货时间，填写整数。", 2, "按物流模式校验"],
  ["发货方式", "建议", "说明 Full、Flex、Mercado Envíos 或自定义需求。", "Mercado Envíos", "结合账号物流能力配置"],
  ["图片URL", "建议", "多个公网 HTTPS 图片用英文逗号分隔；确保拥有使用权。", "https://...jpg", "清洗后上传到商品"],
  ["有变体", "是", "有颜色/尺寸等规格选“是”，并填写变体明细。", "否", "决定是否生成 variations"],
  ["其他属性JSON", "否", "高级字段，可留空；不要在不确定时手写。", "{\"MATERIAL\":\"Acero\"}", "合并类目动态属性"],
  ["校验状态", "自动", "无需填写。只做本地完整性提示，最终以 API 校验为准。", "待API校验", "公式自动计算"]
];
const guideEndRow = 4 + guideRows.length;
const checkTitleRow = guideEndRow + 3;
guide.getRange(`A5:E${guideEndRow}`).values = guideRows;
guide.getRange(`A5:E${guideEndRow}`).format = { font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "top", wrapText: true };
guide.getRange(`A5:E${guideEndRow}`).format.borders = { insideHorizontal: { style: "thin", color: colors.line } };
guide.getRange(`B5:B${guideEndRow}`).format = { fill: colors.gray, font: { name: fontName, size: 10, bold: true, color: colors.text }, horizontalAlignment: "center" };
guide.getRange(`A${checkTitleRow}:E${checkTitleRow}`).merge();
guide.getRange(`A${checkTitleRow}`).values = [["提交前检查"]];
guide.getRange(`A${checkTitleRow}:E${checkTitleRow}`).format = { fill: colors.green, font: { name: fontName, size: 11, bold: true, color: colors.text }, borders: { preset: "outside", style: "thin", color: colors.line } };
guide.getRange(`A${checkTitleRow + 1}:E${checkTitleRow + 5}`).values = [
  ["1", "第一批建议 5–10 个商品，操作选择“仅检查”。", "", "", ""],
  ["2", "不要编造品牌、型号、条码、认证或保修信息。", "", "", ""],
  ["3", "图片必须是可公开访问的 HTTPS 地址，并确认具有使用权限。", "", "", ""],
  ["4", "同一个主SKU只能在商品主表出现一次；变体使用独立变体SKU。", "", "", ""],
  ["5", "提交后将先生成预览和错误报告，确认后才真实发布。", "", "", ""]
];
guide.getRange(`B${checkTitleRow + 1}:E${checkTitleRow + 5}`).merge(true);
guide.getRange(`A${checkTitleRow + 1}:E${checkTitleRow + 5}`).format = { font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "center", wrapText: true };
guide.freezePanes.freezeRows(4);
[28,14,52,34,34].forEach((width, index) => { guide.getRangeByIndexes(0, index, checkTitleRow + 6, 1).format.columnWidth = width; });
guide.getRange(`A5:E${guideEndRow}`).format.rowHeight = 34;
guide.getRange(`A${checkTitleRow + 1}:E${checkTitleRow + 5}`).format.rowHeight = 28;
const guideTable = guide.tables.add(`A4:E${guideEndRow}`, true, "MeliFieldGuide");
guideTable.style = "TableStyleMedium2";

const contentRules = workbook.worksheets.add("内容规则");
styleTitle(contentRules, "A1", "标题与描述生成规则", "内容以采购链接、竞品页面和已确认的商品事实为依据。生成结果在真实发布前进入预览。");
contentRules.getRange("A4:D4").values = [["模块", "生成规则", "输出要求", "禁止事项"]];
styleHeader(contentRules.getRange("A4:D4"));
const contentRows = [
  ["标题研究", "读取用户提供的竞品标题；检索该类目同款商品的前五个相关热销结果；提取共同关键词；结合智利买家的常用搜索表达和美客多高转化标题顺序。", "生成自然、清晰的智利西班牙语标题；优先包含品类、关键特性、型号或规格；长度以平台实时限制为准。", "不复制竞品品牌；不堆砌重复词；不添加采购页无法证明的功能、认证或兼容性。"],
  ["欢迎语", "以 Furaxis 店铺身份欢迎买家，并用一段话说明商品用途与主要价值。", "使用“¡Bienvenido a Furaxis!”；语气自然、专业，避免过度营销。", "不使用示例中的 BOUTIQUEUNIVERSAL；不承诺无法保证的交期或效果。"],
  ["商品概述", "根据最终标题、采购链接和已确认的产品特性生成。", "说明适用场景、核心用途和随附物品。", "不得把推测写成事实。"],
  ["核心特点", "把采购页中的重要卖点拆成易读小节，每项先写短标题，再写解释。", "建议 5–9 项；优先写材质、功能、性能、操作、适用对象。", "不编造防水、功率、距离、节能、安全等级或适配范围。"],
  ["规格参数", "将可核实参数整理成键值列表。", "包含品牌、型号、颜色、尺寸、材质、包装内容等实际存在的参数。", "缺失值不展示；不使用“约”等模糊词掩盖未知数据。"],
  ["常见问题", "根据商品特性和常见购买疑问生成问答。", "建议 4–8 组；回答简洁，并与参数保持一致。", "不承诺平台政策之外的退换、售后或使用结果。"],
  ["保修与售后", "仅使用商品表中已经确认的保修类型和期限。", "有保修信息才生成该段；可引导通过 Mercado Libre 站内订单渠道联系。", "无已确认保修时不得套用示例中的 30 天保证。"],
  ["相关搜索词", "结合竞品共同关键词、类目同义词和智利常用表达生成。", "段首固定为“También podrías buscar:”，后接自然且相关的搜索短语。", "不加入无关品牌、竞品店铺名、重复词或与商品不符的关键词。"],
  ["最终校验", "对照采购页、商品表、类目属性和变体明细检查一致性。", "标题、描述、规格、图片和变体不得互相矛盾；发布前生成预览。", "未经用户确认，不执行真实批量发布。"]
];
contentRules.getRange(`A5:D${4 + contentRows.length}`).values = contentRows;
contentRules.getRange(`A5:D${4 + contentRows.length}`).format = { font: { name: fontName, size: 10, color: colors.text }, verticalAlignment: "top", wrapText: true };
contentRules.getRange(`A5:D${4 + contentRows.length}`).format.borders = { insideHorizontal: { style: "thin", color: colors.line } };
contentRules.getRange(`A5:A${4 + contentRows.length}`).format = { fill: colors.gray, font: { name: fontName, size: 10, bold: true, color: colors.text }, verticalAlignment: "top" };
contentRules.freezePanes.freezeRows(4);
[20,62,48,52].forEach((width, index) => { contentRules.getRangeByIndexes(0, index, 15, 1).format.columnWidth = width; });
contentRules.getRange(`A5:D${4 + contentRows.length}`).format.rowHeight = 74;
const contentTable = contentRules.tables.add(`A4:D${4 + contentRows.length}`, true, "MeliContentRules");
contentTable.style = "TableStyleMedium2";
contentRules.tabColor = "#0F766E";
guide.tabColor = "#64748B";
products.tabColor = "#1F2937";
variations.tabColor = "#475569";

workbook.recalculate();
await fs.mkdir(outputDir, { recursive: true });
for (const [sheetName, range, fileName] of [
  ["商品主表", "A1:Z18", "preview-products.png"],
  ["变体明细", "A1:J18", "preview-variations.png"],
  ["填写说明", `A1:E${checkTitleRow + 5}`, "preview-guide.png"],
  ["内容规则", `A1:D${4 + contentRows.length}`, "preview-content-rules.png"]
]) {
  const preview = await workbook.render({ sheetName, range, scale: 1, format: "png" });
  await fs.writeFile(`${outputDir}/${fileName}`, new Uint8Array(await preview.arrayBuffer()));
}
const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(outputPath);

const mainCheck = await workbook.inspect({ kind: "table", range: "商品主表!A1:Z8", include: "values,formulas", tableMaxRows: 8, tableMaxCols: 26 });
const guideCheck = await workbook.inspect({ kind: "table", range: `填写说明!A1:E${checkTitleRow + 5}`, include: "values,formulas", tableMaxRows: checkTitleRow + 5, tableMaxCols: 5 });
const errors = await workbook.inspect({ kind: "match", searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!", options: { useRegex: true, maxResults: 100 }, summary: "final formula error scan" });
console.log(mainCheck.ndjson);
console.log(guideCheck.ndjson);
console.log(errors.ndjson);
console.log(outputPath);
