<template>
    <div class="card chat-app">
        <div id="plist" class="people-list">
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text"><i class="fa fa-search"></i></span>
                </div>
                <input type="text" class="form-control" placeholder="Search...">
            </div>
            <ul class="list-unstyled chat-list mt-2 mb-0">
                <PersonProfileItem />
            </ul>
        </div>
    </div>
</template>

<script>
import PersonProfileItem from './PersonProfileItem.vue';

export default {
    data() {
        return {};
    },
    mounted() {
    },
    methods: {},
    components: { PersonProfileItem }
};
</script>
